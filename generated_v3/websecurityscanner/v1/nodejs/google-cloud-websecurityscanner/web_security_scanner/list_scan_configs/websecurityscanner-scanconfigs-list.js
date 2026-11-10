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

// [START websecurityscanner_v1_websecurityscanner_scanconfigs_list]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Web Security Scanner configurations for a Google Cloud project.
 */
async function listScanConfigs() {
  const client = new WebSecurityScannerClient();

  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}`;

    const request = {
      parent,
    };

    const [scanConfigs] = await client.listScanConfigs(request);
    if (scanConfigs.length === 0) {
      console.log('No scan configurations found.');
      return;
    }

    for (const scanConfig of scanConfigs) {
      console.log(`Scan config name: ${scanConfig.name}`);
      console.log(`Display name: ${scanConfig.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
  }
}

module.exports = { listScanConfigs };
// [END websecurityscanner_v1_websecurityscanner_scanconfigs_list]
