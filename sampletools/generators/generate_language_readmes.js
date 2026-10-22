#!/usr/bin/env node
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
 * @fileoverview CLI and pipeline orchestrator to generate or check language
 * ecosystem landing page READMEs (e.g. docs/KOTLIN.md).
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {parseArgs} = require('node:util');

const {
  loadConfig,
  normalizeLanguageKey,
  getLanguageMetadata,
  getProductDisplayName,
} = require('../lib/catalog_config');
const {defaultLogger, buildGlobalTagIndex} = require('../lib/region_tags');
const {collectCuratedSamples: collectSpecSamples} = require('../lib/sample_specs');
const {
  escapeMdTableCell,
  headingToAnchor,
  renderLanguageReadme,
} = require('./render_language_readme');

/**
 * Collects all spec-backed samples grouped by language key, wired with
 * language dependency metadata.
 *
 * @param {string} repoRoot Root directory of the repository.
 * @param {object} [options] Optional tag index and logger settings.
 * @returns {Promise<Map<string, object[]>>} Resolved samples keyed by language.
 */
async function collectCuratedSamples(repoRoot, options = {}) {
  return collectSpecSamples(repoRoot, {
    ...options,
    getDependencyFile: lang => getLanguageMetadata(lang).dependency_file || '',
  });
}

/**
 * Generates or checks `docs/<LANGUAGE>.md` landing page files.
 *
 * @param {object} params Generation options.
 * @param {string} params.repoRoot Root directory of the repository.
 * @param {string|null} [params.outputDir=null] Output directory for Markdown files.
 * @param {string[]|null} [params.languages=null] Optional language filter list.
 * @param {boolean} [params.checkOnly=false] When true, verifies existing files without writing.
 * @param {object} [params.logger=defaultLogger] Logger interface.
 * @returns {Promise<{processedPaths: string[], outOfDatePaths: string[]}>} Processed and stale file paths.
 */
async function generateLanguageReadmes({
  repoRoot,
  outputDir = null,
  languages = null,
  checkOnly = false,
  logger = defaultLogger,
}) {
  const absRoot = path.resolve(repoRoot);
  if (!fs.existsSync(absRoot) || !fs.statSync(absRoot).isDirectory()) {
    throw new Error(
      `Repository root does not exist or is not a directory: ${absRoot}`
    );
  }
  const absOutputDir = outputDir
    ? path.resolve(absRoot, outputDir)
    : path.join(absRoot, 'docs');

  let outputDirRel = path
    .relative(absRoot, absOutputDir)
    .split(path.sep)
    .join('/');
  if (outputDirRel.startsWith('..')) {
    outputDirRel = 'docs';
  }

  const {tagIndex, filesByLang} = await buildGlobalTagIndex(absRoot, {logger});
  const samplesByLang = await collectCuratedSamples(absRoot, {
    tagIndex,
    logger,
  });

  let targetLangs;
  if (languages && languages.length > 0) {
    targetLangs = languages
      .map(l => normalizeLanguageKey(l))
      .filter(Boolean);
  } else {
    const discovered = new Set([
      ...filesByLang.keys(),
      ...samplesByLang.keys(),
    ]);
    targetLangs = Array.from(discovered).sort((a, b) => {
      const fileA = String(
        getLanguageMetadata(a).output_filename || `${a}.md`
      );
      const fileB = String(
        getLanguageMetadata(b).output_filename || `${b}.md`
      );
      return fileA.localeCompare(fileB);
    });
  }

  if (!checkOnly) {
    fs.mkdirSync(absOutputDir, {recursive: true});
  }

  const processedPaths = [];
  const outOfDatePaths = [];

  for (const lang of targetLangs) {
    const samples = samplesByLang.get(lang) || [];
    const allLangFiles = filesByLang.get(lang) || [];
    const markdown = renderLanguageReadme({
      lang,
      samples,
      allLangFiles,
      outputDirRel,
    });
    const meta = getLanguageMetadata(lang);
    const outFilename = String(meta.output_filename || `${lang}.md`);
    const outPath = path.join(absOutputDir, outFilename);
    processedPaths.push(outPath);

    if (checkOnly) {
      if (!fs.existsSync(outPath)) {
        outOfDatePaths.push(outPath);
      } else {
        const existing = fs.readFileSync(outPath, 'utf8');
        if (existing !== markdown) {
          outOfDatePaths.push(outPath);
        }
      }
    } else {
      fs.writeFileSync(outPath, markdown, 'utf8');
    }
  }

  return {processedPaths, outOfDatePaths};
}

/**
 * Generates or checks language ecosystem landing page READMEs.
 *
 * @param {string[]} [argv=process.argv.slice(2)] Command line arguments.
 *   Supported flags:
 *   - `--repo-root`: Root directory of the repository (for example, '--repo-root /path/to/repo').
 *   - `--output-dir`: Custom output directory for generated Markdown files (for example, '--output-dir docs').
 *   - `--lang`: Target languages to filter processing (for example, '--lang KOTLIN').
 *   - `--check`: Enables verification mode without modifying files (for example, '--check').
 * @returns {Promise<number>} Process exit code (0 on success, 1 on stale files).
 */
async function main(argv = process.argv.slice(2)) {
  const defaultRepoRoot = path.resolve(__dirname, '..', '..');
  const {values} = parseArgs({
    args: argv,
    options: {
      'repo-root': {type: 'string', default: defaultRepoRoot},
      'output-dir': {type: 'string'},
      lang: {type: 'string', multiple: true},
      check: {type: 'boolean', default: false},
    },
    strict: true,
  });

  let langs = null;
  if (values.lang && values.lang.length > 0) {
    langs = [];
    for (const item of values.lang) {
      for (const part of item.split(',')) {
        if (part.trim()) {
          langs.push(part.trim().toUpperCase());
        }
      }
    }
  }

  const repoRoot = values['repo-root'] || defaultRepoRoot;
  const outputDir = values['output-dir'] || null;
  const checkOnly = Boolean(values.check);

  const {processedPaths, outOfDatePaths} = await generateLanguageReadmes({
    repoRoot,
    outputDir,
    languages: langs,
    checkOnly,
  });

  if (checkOnly) {
    if (outOfDatePaths.length > 0) {
      defaultLogger.error('The following language README files are out of date:');
      for (const p of outOfDatePaths) {
        defaultLogger.error(`  - ${p}`);
      }
      return 1;
    }
    defaultLogger.info(
      `Verified ${processedPaths.length} language README file(s) are up to date.`
    );
    return 0;
  }

  for (const p of processedPaths) {
    const rel = path.relative(path.resolve(repoRoot), p).split(path.sep).join('/');
    defaultLogger.info(`Generated ${rel}`);
  }
  return 0;
}

if (require.main === module) {
  main().then(
    code => process.exit(code),
    err => {
      defaultLogger.error(err.stack || err.message);
      process.exit(1);
    }
  );
}

module.exports = {
  loadConfig,
  normalizeLanguageKey,
  getLanguageMetadata,
  getProductDisplayName,
  collectCuratedSamples,
  escapeMdTableCell,
  headingToAnchor,
  renderLanguageReadme,
  generateLanguageReadmes,
  main,
};
