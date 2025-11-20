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

/**
 * @fileoverview Entry point for custom ESLint rules.
 */

'use strict';

const noTabsInStrings = require('./no-tabs-in-strings');

const plugin = {
  meta: {
    name: 'eslint-sample-style',
    version: '0.1.0',
  },
  rules: {
    'no-tabs-in-strings': noTabsInStrings,
  },
};

module.exports = {
  ...plugin,
  configs: {
    recommended: {
      plugins: {
        'sample-style': plugin,
      },
      rules: {
        'sample-style/no-tabs-in-strings': 'error',
      },
    },
  },
};
