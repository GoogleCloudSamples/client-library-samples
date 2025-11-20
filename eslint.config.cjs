// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// // ESLint configuration for Node CommonJS Code Samples.
// This configuration started as a fork of https://github.com/google/gts/tree/v6.0.2
// Changes are expected to have inline comments explaining their purpose.

const {defineConfig, globalIgnores} = require('eslint/config');
const n = require('eslint-plugin-n');
const prettier = require('eslint-plugin-prettier/recommended');
const js = require('@eslint/js');
const sampleStyle = require('./eslint-sample-style');

module.exports = defineConfig([
  // Configuration for eslint.config.cjs itself to avoid 'unpublished' errors
  {
    files: ['eslint.config.cjs'],
    rules: {
      'n/no-unpublished-require': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-missing-require': 'off',
      'n/no-missing-import': 'off',
    },
  },
  js.configs.recommended,
  n.configs['flat/recommended-script'],
  prettier,
  sampleStyle.configs.recommended,
  globalIgnores(['**/node_modules']),
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        // Support most recent ECMAScript.
        // GTS specifies compatibility to 2018.
        ecmaVersion: 'latest',
        // Expects use of require statements and not imports.
        sourceType: 'commonjs',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'block-scoped-var': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': 'error',
      'prefer-arrow-callback': 'error',
      'no-trailing-spaces': 'error',

      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'no-restricted-properties': [
        'error',
        {
          object: 'describe',
          property: 'only',
        },
        {
          object: 'it',
          property: 'only',
        },
      ],

      // Turn off these rules for samples as they are often external dependencies
      'n/no-missing-import': ['off'],
      'n/no-missing-require': ['off'],
      'n/no-unpublished-import': ['off'],
      'n/no-unpublished-require': ['off'],
      'n/no-unsupported-features/es-syntax': ['off'],
      'n/no-extraneous-require': ['off'],

      // Do not explicitly require the 'process' package.
      // Instead, rely on 'process' availability as a global in Node runtimes.
      'n/prefer-global/process': 'error',
      // Require statements should be globals, aligning  with ESM constraints.
      'n/global-require': 'error',
      // Check for global 'use strict'.
      // Implicitly enabled for languageOptions.parserOptions.sourceType options but not for commonjs.
      strict: ['error', 'global'],
      // Prevent fix/todo comments, such as TODO(developer)
      // https://eslint.org/docs/latest/rules/no-warning-comments
      'no-warning-comments': ['error', {decoration: ['*']}],
      // Require object property value shorthand where available.
      // https://eslint.org/docs/latest/rules/object-shorthand
      'object-shorthand': ['error', 'properties'],
      // Make sure default parameter value assignments are functional.
      // https://eslint.org/docs/latest/rules/default-param-last
      'default-param-last': ['error'],
      // Consistently use declared functions.
      // https://eslint.org/docs/latest/rules/func-style
      'func-style': ['error', 'declaration'],
    },
  },
  {
    files: ['**/*.test.js'],
    rules: {
      // Allow require statements in unit tests to support dependency mocking.
      'n/global-require': 'off',
    },
  },
]);