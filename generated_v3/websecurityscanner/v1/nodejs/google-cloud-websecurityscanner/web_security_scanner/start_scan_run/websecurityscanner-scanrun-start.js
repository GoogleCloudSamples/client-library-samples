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

// [START websecurityscanner_v1_websecurityscanner_start_scan_run]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Starts a scan run for a specified scan configuration.
 */
async function startScanRun() {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}`;

    // Retrieve an existing scan configuration to execute a scan run.
    const [scanConfigs] = await client.listScanConfigs({parent});
    if (!scanConfigs || scanConfigs.length === 0) {
      console.log('No scan configurations found.');
      return;
    }

    const scanConfigId = scanConfigs[0].name.split('/').pop();
    const name = `projects/${projectId}/scanConfigs/${scanConfigId}`;

    const request = {
      name,
    };

    const [response] = await client.startScanRun(request);
    console.log(`Scan run started: ${response.name}`);
    console.log(`Execution state: ${response.executionState}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scan configuration not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Scan run cannot start: ${err.message}`);
    } else {
      console.error(`Failed to start scan run: ${err.message}`);
    }
  }
}

module.exports = { startScanRun };
// [END websecurityscanner_v1_websecurityscanner_start_scan_run]
