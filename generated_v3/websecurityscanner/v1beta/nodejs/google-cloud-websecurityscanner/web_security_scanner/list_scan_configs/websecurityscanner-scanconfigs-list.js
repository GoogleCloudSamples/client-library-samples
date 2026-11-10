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

// [START websecurityscanner_v1beta_websecurityscanner_scanconfigs_list]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Lists Web Security Scanner configurations for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listScanConfigs(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const [scanConfigs] = await client.listScanConfigs({parent});

    for (const scanConfig of scanConfigs) {
      console.log(`Scan config: ${scanConfig.name}`);
      console.log(`Display name: ${scanConfig.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing project: ${err.message}`);
    } else {
      console.error(`Failed to list scan configs: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listScanConfigs };
// [END websecurityscanner_v1beta_websecurityscanner_scanconfigs_list]
