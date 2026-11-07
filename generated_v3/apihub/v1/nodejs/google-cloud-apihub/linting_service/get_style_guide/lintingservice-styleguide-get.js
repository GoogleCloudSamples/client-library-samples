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

// [START apihub_v1_lintingservice_styleguide_get]
'use strict';

const {LintingServiceClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new LintingServiceClient();

/**
 * Retrieves a style guide for a specified linter plugin in API Hub.
 *
 * @param {string} projectId - The Google Cloud project ID where the API Hub instance and plugin are hosted.
 * @param {string} locationId - The Google Cloud region where the API Hub instance is provisioned (for example, 'us-central1').
 * @param {string} pluginId - The identifier of the linter plugin hosting the style guide.
 */
async function getStyleGuide(projectId, locationId, pluginId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/plugins/${pluginId}/styleGuide`;

    const request = {
      name,
    };

    const [response] = await client.getStyleGuide(request);
    console.log(`Style guide name: ${response.name}`);
    console.log(`Linter: ${response.linter}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Style guide not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { getStyleGuide };
// [END apihub_v1_lintingservice_styleguide_get]
