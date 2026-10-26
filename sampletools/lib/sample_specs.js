// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Reusable utilities for discovering `.samples/*.spec.json`
 * manifests and resolving their language instances to sample source files.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const {
  EXTENSION_MAP,
  IGNORED_DIRS,
  defaultLogger,
  deriveVersionlessTag,
  extractVersionFromTagOrId,
  buildGlobalTagIndex,
} = require('./region_tags');

/**
 * Recursively finds all `.samples/*.spec.json` files under `rootDir`.
 *
 * @param {string} rootDir Repository root directory.
 * @returns {string[]} Sorted list of absolute `.spec.json` file paths.
 */
function findSpecs(rootDir) {
  const absRoot = path.resolve(rootDir);
  const results = [];

  function walk(currentDir) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, {withFileTypes: true});
    } catch (_err) {
      return;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '.samples') {
          let specEntries = [];
          try {
            specEntries = fs.readdirSync(fullPath, {withFileTypes: true});
          } catch (_err) {
            continue;
          }
          specEntries.sort((a, b) => a.name.localeCompare(b.name));
          for (const specEntry of specEntries) {
            if (specEntry.isFile() && specEntry.name.endsWith('.spec.json')) {
              results.push(path.join(fullPath, specEntry.name));
            }
          }
        } else if (!entry.name.startsWith('.') && !IGNORED_DIRS.has(entry.name)) {
          walk(fullPath);
        }
      }
    }
  }

  walk(absRoot);
  return results.sort();
}

/**
 * Resolves the source file path and matched tag for a spec language instance.
 *
 * @param {object} params Resolution parameters.
 * @param {string} params.serviceDir Absolute path to the product directory.
 * @param {string} params.requiredExt File extension for the target language.
 * @param {string[]} params.specTags Region tags declared in the spec.
 * @param {string|null} params.expectedVersion Expected service version (e.g. 'v1').
 * @param {Map<string, string[]>} params.tagIndex Global region tag index.
 * @returns {{filePath: string, matchedTag: string}|null} Resolved sample file and tag, or null.
 */
function resolveSampleFile({
  serviceDir,
  requiredExt,
  specTags,
  expectedVersion,
  tagIndex,
}) {
  const candidateTags = [...specTags];
  for (const tag of specTags) {
    const vLess = deriveVersionlessTag(tag);
    if (vLess && !candidateTags.includes(vLess)) {
      candidateTags.push(vLess);
    }
  }

  // First pass: prefer files matching the expected service version directory if known.
  if (expectedVersion) {
    const versionPrefix = path.join(serviceDir, expectedVersion) + path.sep;
    for (const tag of candidateTags) {
      const files = tagIndex.get(tag) || [];
      for (const filePath of files) {
        if (
          filePath.endsWith(requiredExt) &&
          filePath.startsWith(versionPrefix)
        ) {
          return {filePath, matchedTag: tag};
        }
      }
    }
  }

  // Second pass: match any file under serviceDir for the candidate tags in priority order.
  const servicePrefix = serviceDir + path.sep;
  for (const tag of candidateTags) {
    const files = tagIndex.get(tag) || [];
    for (const filePath of files) {
      if (
        filePath.endsWith(requiredExt) &&
        filePath.startsWith(servicePrefix)
      ) {
        return {filePath, matchedTag: tag};
      }
    }
  }

  return null;
}

/**
 * Collects all spec-backed samples grouped by language key.
 *
 * @param {string} repoRoot Repository root directory.
 * @param {object} [options] Optional tag index, dependency file lookup, and logger settings.
 * @returns {Promise<Map<string, object[]>>} Resolved sample entries keyed by language.
 */
async function collectCuratedSamples(repoRoot, options = {}) {
  const logger = options.logger || defaultLogger;
  const getDependencyFile = options.getDependencyFile || (() => '');
  const absRoot = path.resolve(repoRoot);
  let tagIndex = options.tagIndex;
  if (!tagIndex) {
    const built = await buildGlobalTagIndex(absRoot, options);
    tagIndex = built.tagIndex;
  }

  const specs = findSpecs(absRoot);
  const samplesByLang = new Map();
  const seenEntries = new Set();

  for (const specPath of specs) {
    let data;
    try {
      const raw = fs.readFileSync(specPath, 'utf8');
      data = JSON.parse(raw);
    } catch (err) {
      logger.warn(`Skipping invalid spec ${specPath}: ${err.message}`);
      continue;
    }

    const samplesDir = path.dirname(specPath);
    const serviceDir = path.resolve(path.dirname(samplesDir));
    const productSlug = path.basename(serviceDir);

    const specTags = (data.regionTags || [])
      .map(t => t && t.name)
      .filter(Boolean);
    if (specTags.length === 0) {
      continue;
    }

    const sampleId = data.sampleId || specTags[0];
    const title = String(data.title || sampleId).trim();
    const description = String(data.description || '').trim();
    const expectedVersion =
      (data.extended && data.extended.service_version) ||
      extractVersionFromTagOrId(sampleId) ||
      extractVersionFromTagOrId(specTags[0]);

    for (const instance of data.instances || []) {
      if (!instance || typeof instance !== 'object') {
        continue;
      }
      const lang = String(
        (instance.categories && instance.categories.language) || ''
      ).toUpperCase();
      if (!lang || !EXTENSION_MAP[lang]) {
        continue;
      }

      const requiredExt = EXTENSION_MAP[lang];
      const resolved = resolveSampleFile({
        serviceDir,
        requiredExt,
        specTags,
        expectedVersion,
        tagIndex,
      });
      if (!resolved) {
        continue;
      }

      const {filePath: absFilePath, matchedTag} = resolved;
      const relFilePath = path
        .relative(absRoot, absFilePath)
        .split(path.sep)
        .join('/');
      const dedupKey = `${lang}::${sampleId}::${relFilePath}`;
      if (seenEntries.has(dedupKey)) {
        continue;
      }
      seenEntries.add(dedupKey);

      const parts = relFilePath.split('/');
      const version = parts.length >= 4 ? parts[1] : expectedVersion || 'v1';
      const libraryName = parts.length >= 5 ? parts[3] : '';
      const libraryRelDir = path.posix.dirname(relFilePath);

      const depFile = String(getDependencyFile(lang) || '');
      const hasDepFile = Boolean(
        depFile &&
          fs.existsSync(path.join(absRoot, libraryRelDir, depFile)) &&
          fs.statSync(path.join(absRoot, libraryRelDir, depFile)).isFile()
      );

      const entry = {
        language: lang,
        product: productSlug,
        version,
        libraryName,
        libraryRelDir,
        title,
        description,
        sampleId,
        primaryTag: matchedTag,
        fileRelPath: relFilePath,
        hasDepFile,
      };

      if (!samplesByLang.has(lang)) {
        samplesByLang.set(lang, []);
      }
      samplesByLang.get(lang).push(entry);
    }
  }

  for (const [, entries] of samplesByLang) {
    entries.sort((a, b) => {
      if (a.product !== b.product) return a.product.localeCompare(b.product);
      if (a.version !== b.version) return a.version.localeCompare(b.version);
      const titleCmp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      if (titleCmp !== 0) return titleCmp;
      return a.fileRelPath.localeCompare(b.fileRelPath);
    });
  }

  return samplesByLang;
}

module.exports = {
  findSpecs,
  resolveSampleFile,
  collectCuratedSamples,
};
