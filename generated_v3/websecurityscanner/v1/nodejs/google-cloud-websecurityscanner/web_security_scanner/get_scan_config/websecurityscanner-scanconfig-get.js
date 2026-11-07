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

// [START websecurityscanner_v1_websecurityscanner_scanconfig_get]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Retrieves the details of a specific Web Security Scanner configuration.
 */
async function getScanConfig() {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}`;

    // Retrieve existing scan configurations to obtain a valid resource name
    const [scanConfigs] = await client.listScanConfigs({parent});

    if (!scanConfigs || scanConfigs.length === 0) {
      console.log('No scan configs found.');
      return;
    }

    const request = {
      name: scanConfigs[0].name,
    };

    const [scanConfig] = await client.getScanConfig(request);

    console.log(`Scan config retrieved successfully: ${scanConfig.name}`);
    console.log(`Display name: ${scanConfig.displayName}`);
    console.log(`Starting URLs: ${(scanConfig.startingUrls || []).join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scan config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing scan config: ${err.message}`);
    } else {
      console.error(`Failed to retrieve scan config: ${err.message}`);
    }
  }
}

module.exports = { getScanConfig };
// [END websecurityscanner_v1_websecurityscanner_scanconfig_get]
