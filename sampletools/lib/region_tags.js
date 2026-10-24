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
 * @fileoverview Reusable utilities for parsing and indexing `[START <tag>]`
 * region tags across sample source files in the repository.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const EXTENSION_MAP = {
  NODEJS: '.js',
  PYTHON: '.py',
  JAVA: '.java',
  KOTLIN: '.kt',
  GO: '.go',
  CSHARP: '.cs',
  PHP: '.php',
  RUBY: '.rb',
};

const IGNORED_TAGS = new Set(['app_yaml']);
const IGNORED_DIRS = new Set([
  'node_modules',
  'sampletools',
  'docs',
  'target',
  'build',
]);
const DEFAULT_IO_CONCURRENCY = 32;

const defaultLogger = {
  info: msg => process.stdout.write(`INFO: ${msg}\n`),
  warn: msg => process.stderr.write(`WARNING: ${msg}\n`),
  error: msg => process.stderr.write(`ERROR: ${msg}\n`),
};

/**
 * Removes the service version component (e.g. `_v1_`, `_v2beta1_`) from a tag.
 *
 * @param {string} tagName Versioned region tag string.
 * @returns {string|null} Versionless region tag, or null if no version token is present.
 */
function deriveVersionlessTag(tagName) {
  const pattern = /(_v\d+[a-zA-Z0-9]*_)/;
  if (pattern.test(tagName)) {
    return tagName.replace(pattern, '_');
  }
  return null;
}

/**
 * Extracts the version token (e.g. `'v1'`, `'v2beta1'`) from a sampleId or region tag.
 *
 * @param {string} identifier Sample ID or region tag string.
 * @returns {string|null} Extracted version token, or null if not found.
 */
function extractVersionFromTagOrId(identifier) {
  const match = /_(v\d+[a-zA-Z0-9]*)_/.exec(identifier || '');
  return match ? match[1] : null;
}

/**
 * Streams a file line-by-line and extracts all `[START <tag>]` region tags.
 *
 * @param {string} filePath Absolute path to the source file.
 * @param {Function} [createStreamFn=fs.createReadStream] Stream factory function.
 * @returns {Promise<string[]>} Unique region tags found in the file.
 */
async function extractTagsFromFile(
  filePath,
  createStreamFn = fs.createReadStream
) {
  const foundTags = [];
  const tagPattern = /\[START\s+([a-zA-Z0-9_-]+)\]/g;
  const stream = createStreamFn(filePath, {encoding: 'utf8'});
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line.includes('[START')) {
      continue;
    }
    let match;
    tagPattern.lastIndex = 0;
    while ((match = tagPattern.exec(line)) !== null) {
      const tag = match[1];
      if (!IGNORED_TAGS.has(tag) && !foundTags.includes(tag)) {
        foundTags.push(tag);
      }
    }
  }
  return foundTags;
}

/**
 * Scans source files in `rootDir` line-by-line for `[START <tag>]` comments
 * using bounded concurrency while preserving deterministic ordering.
 *
 * @param {string} rootDir Repository root directory.
 * @param {object} [options] Optional logger, stream factory, and concurrency settings.
 * @returns {Promise<{tagIndex: Map<string, string[]>, filesByLang: Map<string, string[]>}>}
 */
async function buildGlobalTagIndex(rootDir, options = {}) {
  const logger = options.logger || defaultLogger;
  const createStreamFn = options.createReadStream || fs.createReadStream;
  const concurrency = Math.max(
    1,
    Number(options.concurrency) || DEFAULT_IO_CONCURRENCY
  );
  const absRoot = path.resolve(rootDir);

  const extToLang = new Map();
  for (const [lang, ext] of Object.entries(EXTENSION_MAP)) {
    extToLang.set(ext, lang);
  }

  const candidateFiles = [];

  function collectFiles(currentDir) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, {withFileTypes: true});
    } catch (err) {
      logger.warn(`Could not read directory ${currentDir}: ${err.message}`);
      return;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));

    const dirs = [];
    for (const entry of entries) {
      if (entry.name.startsWith('.')) {
        continue;
      }
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          dirs.push(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        const absPath = path.join(currentDir, entry.name);
        const langKey = extToLang.get(path.extname(absPath));
        if (langKey) {
          candidateFiles.push({absPath, langKey});
        }
      }
    }

    for (const subDir of dirs) {
      collectFiles(subDir);
    }
  }

  collectFiles(absRoot);

  const tagIndex = new Map();
  const filesByLang = new Map();

  for (let i = 0; i < candidateFiles.length; i += concurrency) {
    const batch = candidateFiles.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async ({absPath, langKey}) => {
        try {
          const foundTags = await extractTagsFromFile(absPath, createStreamFn);
          return {absPath, langKey, foundTags};
        } catch (err) {
          logger.warn(`Could not read ${absPath}: ${err.message}`);
          return null;
        }
      })
    );

    for (const result of batchResults) {
      if (!result || result.foundTags.length === 0) {
        continue;
      }
      const {absPath, langKey, foundTags} = result;
      const relPath = path
        .relative(absRoot, absPath)
        .split(path.sep)
        .join('/');
      if (!filesByLang.has(langKey)) {
        filesByLang.set(langKey, []);
      }
      filesByLang.get(langKey).push(relPath);

      for (const tag of foundTags) {
        if (!tagIndex.has(tag)) {
          tagIndex.set(tag, []);
        }
        const list = tagIndex.get(tag);
        if (!list.includes(absPath)) {
          list.push(absPath);
        }
      }
    }
  }

  return {tagIndex, filesByLang};
}

module.exports = {
  EXTENSION_MAP,
  IGNORED_TAGS,
  IGNORED_DIRS,
  DEFAULT_IO_CONCURRENCY,
  defaultLogger,
  deriveVersionlessTag,
  extractVersionFromTagOrId,
  extractTagsFromFile,
  buildGlobalTagIndex,
};
