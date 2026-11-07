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

// [START websecurityscanner_v1_websecurityscanner_scanconfig_delete]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Deletes a scan configuration in Web Security Scanner.
 */
async function deleteScanConfig() {
  try {
    const projectId = await client.getProjectId();
    let scanConfigId = process.env.SCAN_CONFIG_ID;

    if (!scanConfigId) {
      const parent = `projects/${projectId}`;
      const [scanConfigs] = await client.listScanConfigs({parent});
      if (scanConfigs && scanConfigs.length > 0) {
        scanConfigId = scanConfigs[0].name.split('/').pop();
      }
    }

    if (!scanConfigId) {
      console.log('No scan configuration found to delete.');
      return;
    }

    const name = `projects/${projectId}/scanConfigs/${scanConfigId}`;
    const request = {
      name,
    };

    await client.deleteScanConfig(request);
    console.log(`Deleted scan configuration: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scan configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error deleting scan configuration: ${err.message || err}`);
    }
  }
}

module.exports = {deleteScanConfig};
// [END websecurityscanner_v1_websecurityscanner_scanconfig_delete]
