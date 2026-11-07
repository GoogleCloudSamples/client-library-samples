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

// [START websecurityscanner_v1_websecurityscanner_stop_scan_run]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

/**
 * Stops an active Web Security Scanner scan run.
 */
async function stopScanRun() {
  const client = new WebSecurityScannerClient();
  const projectId = await client.getProjectId();
  const parent = client.projectPath(projectId);

  const [scanConfigs] = await client.listScanConfigs({parent});
  for (const scanConfig of scanConfigs) {
    const [scanRuns] = await client.listScanRuns({
      parent: scanConfig.name,
    });

    if (scanRuns.length === 0) {
      continue;
    }

    const targetRun =
      scanRuns.find(
        run =>
          run.executionState === 'SCANNING' || run.executionState === 'QUEUED'
      ) || scanRuns[0];

    try {
      const [scanRun] = await client.stopScanRun({name: targetRun.name});
      console.log(`Scan run stopped: ${scanRun.name}`);
      console.log(`Execution state: ${scanRun.executionState}`);
      console.log(`Result state: ${scanRun.resultState}`);
      return;
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        console.error(`Scan run not found: ${err.message}`);
      } else if (err.code === status.FAILED_PRECONDITION) {
        console.error(`Invalid scan run state: ${err.message}`);
      } else {
        console.error(`Failed to stop scan run: ${err.message}`);
      }
      return;
    }
  }

  console.log('No scan runs found to stop.');
}

module.exports = {stopScanRun};
// [END websecurityscanner_v1_websecurityscanner_stop_scan_run]
