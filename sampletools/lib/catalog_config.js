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
 * @fileoverview Product and language taxonomy configuration helpers shared
 * across sampletools generators and validators.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const {EXTENSION_MAP} = require('./region_tags');

const DEFAULT_CONFIG_PATH = path.resolve(
  __dirname,
  '..',
  'generators',
  'language_readme_config.json'
);

/**
 * Loads language and product display configuration from JSON.
 *
 * @param {string} [configPath=DEFAULT_CONFIG_PATH] Path to the JSON configuration file.
 * @returns {object} Parsed configuration object.
 */
function loadConfig(configPath = DEFAULT_CONFIG_PATH) {
  const raw = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(raw);
}

const CONFIG = loadConfig();
const PRODUCT_DISPLAY_NAMES = CONFIG.product_display_names || {};
const LANGUAGE_ALIASES = CONFIG.language_aliases || {};
const LANGUAGE_CONFIG = CONFIG.languages || {};

/**
 * Normalizes a CLI or spec language identifier to its canonical key.
 *
 * @param {string} lang Raw language identifier (e.g. 'JAVASCRIPT', 'NODEJS').
 * @returns {string} Canonical language key (e.g. 'NODEJS').
 */
function normalizeLanguageKey(lang) {
  const upper = String(lang || '')
    .trim()
    .toUpperCase();
  return LANGUAGE_ALIASES[upper] || upper;
}

/**
 * Returns metadata for a language key (e.g. 'KOTLIN'), with sensible defaults.
 *
 * @param {string} lang Language identifier.
 * @returns {object} Language configuration metadata.
 */
function getLanguageMetadata(lang) {
  const langUpper = normalizeLanguageKey(lang);
  if (LANGUAGE_CONFIG[langUpper]) {
    return LANGUAGE_CONFIG[langUpper];
  }

  const lower = langUpper.toLowerCase();
  const ext = EXTENSION_MAP[langUpper] || `.${lower}`;
  const display = lower.charAt(0).toUpperCase() + lower.slice(1);
  return {
    display_name: display,
    output_filename: `${langUpper}.md`,
    dir_name: lower,
    extension: ext,
    github_lang: display,
    dependency_file: '',
    prerequisites: [
      `**${display} toolchain**: Ensure the appropriate ${display} compiler/runtime is installed.`,
    ],
    run_instructions: [
      `Navigate to the \`${lower}\` sample directory for the desired product and service version.`,
      'Install dependencies using your ecosystem package manager and execute the sample.',
    ],
    run_code_block: `# Navigate to the ${lower} sample directory and run the sample`,
  };
}

/**
 * Returns a human-friendly product name for a product directory slug.
 *
 * @param {string} productSlug Repository product directory name.
 * @returns {string} Human-readable product display name.
 */
function getProductDisplayName(productSlug) {
  if (PRODUCT_DISPLAY_NAMES[productSlug]) {
    return PRODUCT_DISPLAY_NAMES[productSlug];
  }
  return productSlug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

module.exports = {
  DEFAULT_CONFIG_PATH,
  loadConfig,
  normalizeLanguageKey,
  getLanguageMetadata,
  getProductDisplayName,
};
