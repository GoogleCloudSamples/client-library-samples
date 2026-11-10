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

// [START websecurityscanner_v1alpha_websecurityscanner_scanconfig_get]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Use the getScanConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} scanConfigId - ID of the ScanConfig (for example, 'example-scanconfig-id')
 */
async function getScanConfig(projectId, scanConfigId) {
  try {
    const name = `projects/${projectId}/scanConfigs/${scanConfigId}`;

    const [scanConfig] = await client.getScanConfig({name});

    console.log(`Retrieved scan config: ${scanConfig.name}`);
    console.log(`Display name: ${scanConfig.displayName}`);

    return scanConfig;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scan config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getScanConfig };
// [END websecurityscanner_v1alpha_websecurityscanner_scanconfig_get]
