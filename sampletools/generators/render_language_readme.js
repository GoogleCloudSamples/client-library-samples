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
 * @fileoverview Markdown formatting and template rendering for language
 * landing page READMEs (docs/<LANGUAGE>.md).
 */

'use strict';

const path = require('node:path');

const {
  getLanguageMetadata,
  getProductDisplayName,
} = require('../lib/catalog_config');

const GITHUB_REPO_URL =
  'https://github.com/GoogleCloudSamples/client-library-samples';

/**
 * Escapes pipe characters and newlines for safe rendering inside a Markdown table.
 *
 * @param {string} text Raw text to escape.
 * @returns {string} Escaped single-line table cell content.
 */
function escapeMdTableCell(text) {
  const cleaned = String(text || '')
    .split(/\r?\n/)
    .join(' ')
    .trim();
  return cleaned.replace(/\|/g, '\\|');
}

/**
 * Converts a Markdown heading string into a GitHub Flavored Markdown anchor slug.
 *
 * @param {string} heading Markdown heading text.
 * @returns {string} Anchor slug.
 */
function headingToAnchor(heading) {
  return String(heading || '')
    .toLowerCase()
    .replace(/[^a-z0-9\- ]/g, '')
    .trim()
    .replace(/ /g, '-');
}

/**
 * Encodes a GitHub search query matching standard percent-encoding with `%2A` for `*`.
 *
 * @param {string} query Search query string.
 * @returns {string} URL-encoded query string.
 */
function encodeSearchQuery(query) {
  return encodeURIComponent(query).replace(/\*/g, '%2A');
}

/**
 * Groups resolved samples by (product, version) sorted by display name and version.
 *
 * @param {object[]} samples Resolved sample entries for a language.
 * @returns {object[]} Sorted product/version sample groups.
 */
function groupSamplesByProductVersion(samples) {
  const grouped = new Map();
  for (const sample of samples) {
    const key = `${sample.product}::${sample.version}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        product: sample.product,
        version: sample.version,
        entries: [],
      });
    }
    grouped.get(key).entries.push(sample);
  }

  return Array.from(grouped.values()).sort((a, b) => {
    const nameA = getProductDisplayName(a.product).toLowerCase();
    const nameB = getProductDisplayName(b.product).toLowerCase();
    if (nameA !== nameB) return nameA.localeCompare(nameB);
    return a.version.localeCompare(b.version);
  });
}

/**
 * Renders a single product/version Markdown table section.
 *
 * @param {object} group Product/version group containing sample entries.
 * @param {string} rootPrefix Relative path prefix back to the repository root.
 * @param {string} depFile Ecosystem dependency filename (e.g. 'pom.xml').
 * @returns {string} Rendered Markdown section.
 */
function renderProductGroupSection(group, rootPrefix, depFile) {
  const groupEntries = group.entries;
  const prodName = getProductDisplayName(group.product);
  const libRelDir = groupEntries[0].libraryRelDir;
  const libName = groupEntries[0].libraryName || path.posix.basename(libRelDir);
  const libLink = `${rootPrefix}/${libRelDir}`;
  const depInfo =
    depFile && groupEntries[0].hasDepFile
      ? ` | **Config**: [\`${depFile}\`](${libLink}/${depFile})`
      : '';

  const rows = groupEntries.map(entry => {
    const sampleLink = `${rootPrefix}/${entry.fileRelPath}`;
    const fileBasename = path.posix.basename(entry.fileRelPath);
    const titleCell =
      `[**${escapeMdTableCell(entry.title)}**](${sampleLink})<br>` +
      `<sub>\`${escapeMdTableCell(fileBasename)}\`</sub>`;
    return `| ${titleCell} | ${escapeMdTableCell(entry.description)} |`;
  });

  return [
    `### ${prodName} (${group.version})\n`,
    `**Client Library Directory**: [\`${libName}\`](${libLink})${depInfo}\n`,
    '| Sample | Description |',
    '| :--- | :--- |',
    ...rows,
    '',
  ].join('\n');
}

/**
 * Renders the full Markdown content for `docs/<LANGUAGE>.md`.
 *
 * @param {object} params Rendering parameters.
 * @param {string} params.lang Language key (e.g. 'KOTLIN').
 * @param {object[]} params.samples Curated spec-backed sample entries.
 * @param {string[]} params.allLangFiles All repository source files for this language.
 * @param {string} [params.outputDirRel='docs'] Output directory relative to repo root.
 * @param {string} [params.repoUrl=GITHUB_REPO_URL] GitHub repository base URL.
 * @returns {string} Complete Markdown document string.
 */
function renderLanguageReadme({
  lang,
  samples,
  allLangFiles,
  outputDirRel = 'docs',
  repoUrl = GITHUB_REPO_URL,
}) {
  const meta = getLanguageMetadata(lang);
  const displayName = String(meta.display_name);
  const dirName = String(meta.dir_name);
  const ext = String(meta.extension);
  const githubLang = String(meta.github_lang);
  const depFile = String(meta.dependency_file || '');
  const prerequisites = Array.isArray(meta.prerequisites)
    ? meta.prerequisites
    : [];
  const runInstructions = Array.isArray(meta.run_instructions)
    ? meta.run_instructions
    : [];
  const runCodeBlock = String(meta.run_code_block || '');

  const depth = outputDirRel
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(p => p && p !== '.').length;
  const rootPrefix = depth > 0 ? Array(depth).fill('..').join('/') : '.';

  const pathQuery = `path:**/${dirName}/**`;
  const githubPathSearchUrl = `${repoUrl}/search?q=${encodeSearchQuery(pathQuery)}`;
  const langQuery = `language:${githubLang} path:**/${dirName}/**`;
  const githubLangSearchUrl = `${repoUrl}/search?q=${encodeSearchQuery(langQuery)}`;

  const productGroups = groupSamplesByProductVersion(samples);
  const allProductsInLang = new Set(
    allLangFiles.filter(f => f.includes('/')).map(f => f.split('/')[0])
  );

  const runningHeading = `Running a ${displayName} Sample`;
  const searchHeading = `Search Shortcut: All ${displayName} Samples`;
  const tocGroupLinks = productGroups.map(group => {
    const groupHeading = `${getProductDisplayName(group.product)} (${group.version})`;
    return `  - [${groupHeading}](#${headingToAnchor(groupHeading)})`;
  });

  const prereqItems = prerequisites.map(
    (prereq, idx) => `${idx + 3}. ${prereq}`
  );
  const runStepItems = runInstructions.map(
    (step, idx) => `${idx + 1}. ${step}`
  );

  const curatedSection =
    productGroups.length === 0
      ? `_No curated spec-backed samples are currently registered for ${displayName}. Use the [search shortcuts](#${headingToAnchor(searchHeading)}) above to browse \`${ext}\` files in the repository._\n`
      : [
          `Below are the **${samples.length}** curated ${displayName} samples across **${productGroups.length}** product versions:\n`,
          ...productGroups.map(group =>
            renderProductGroupSection(group, rootPrefix, depFile)
          ),
        ].join('\n');

  return [
    '<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->',
    '<!-- Generated by sampletools/generators/generate_language_readmes.js -->\n',
    `# Google Cloud API Samples for ${displayName}\n`,
    `Welcome to the **${displayName}** sample landing page for Google Cloud Client Libraries. This guide covers prerequisites, setup instructions, search shortcuts across all ${displayName} code examples, and a curated catalog of available samples.\n`,
    '## Table of Contents\n',
    `- [Prerequisites](#${headingToAnchor('Prerequisites')})`,
    `- [${runningHeading}](#${headingToAnchor(runningHeading)})`,
    `- [${searchHeading}](#${headingToAnchor(searchHeading)})`,
    `- [Curated List of Available Samples](#${headingToAnchor('Curated List of Available Samples')})`,
    ...tocGroupLinks,
    `- [Important Notes](#${headingToAnchor('Important Notes')})\n`,
    '## Prerequisites\n',
    'Before running any sample, ensure you have configured your Google Cloud environment and local toolchain:\n',
    '1. **Google Cloud Project**: You need an active Google Cloud project with billing enabled and the target service API enabled.',
    '2. **Authentication (Application Default Credentials)**: These samples authenticate using [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/provide-credentials-adc). For local development, initialize ADC with the Google Cloud CLI:',
    '   ```bash',
    '   gcloud auth application-default login',
    '   ```',
    ...prereqItems,
    '',
    `## ${runningHeading}\n`,
    `Samples in this repository are organized hierarchically by \`{Product}/{Service Version}/${dirName}/{Client Library Name}\`.\n`,
    ...runStepItems,
    '',
    '```bash',
    runCodeBlock,
    '```\n',
    `## ${searchHeading}\n`,
    `This repository contains **${allLangFiles.length}** \`${ext}\` sample files across **${allProductsInLang.size}** Google Cloud products. Use the shortcuts below to quickly search or filter ${displayName} samples:\n`,
    `- **GitHub Code Search (by path)**: [Search all \`${dirName}\` samples on GitHub](${githubPathSearchUrl}) (\`${pathQuery}\`)`,
    `- **GitHub Code Search (by language + keyword)**: [Filter \`${githubLang}\` samples on GitHub](${githubLangSearchUrl}) (append your API or method keyword in the search box)`,
    `- **GitHub File Finder**: Press <kbd>t</kbd> in the GitHub repository view and type \`/${dirName}/\` to fuzzy-find any ${displayName} sample file.`,
    '- **Local CLI Search**:',
    '  ```bash',
    `  # List all ${displayName} sample files in this repository`,
    `  find . -path "*/${dirName}/*" -name "*${ext}" | sort`,
    '',
    `  # Search for a specific API method or keyword across ${displayName} samples`,
    `  git grep -n "<keyword>" -- "*/${dirName}/*${ext}"`,
    '  ```\n',
    '## Curated List of Available Samples\n',
    curatedSection,
    '## Important Notes\n',
    '- **Billing**: Running these samples against live Google Cloud APIs may incur charges on your Google Cloud project.',
    '- **Data Impact**: Some examples create, modify, or delete real cloud resources. Review sample code and parameters before running.',
    '- **Cleanup**: Delete any test resources created while running samples to avoid ongoing costs.',
    `- **Contributing**: See [\`CONTRIBUTING.md\`](${rootPrefix}/CONTRIBUTING.md) for guidelines on reporting issues or contributing samples.\n`,
  ].join('\n');
}

module.exports = {
  GITHUB_REPO_URL,
  escapeMdTableCell,
  headingToAnchor,
  encodeSearchQuery,
  renderLanguageReadme,
};
