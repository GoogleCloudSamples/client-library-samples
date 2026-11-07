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

// [START datalineage_v1_lineage_run_update]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Updates a Lineage run.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud region where the Lineage run is located (for example, 'us-central1').
 * @param {string} processId - Identifier of the parent Lineage process.
 * @param {string} runId - Identifier of the Lineage run to update.
 */
async function updateRun(projectId, locationId, processId, runId) {
  try {
    const run = {
      name: `projects/${projectId}/locations/${locationId}/processes/${processId}/runs/${runId}`,
      displayName: 'updated-run-display-name',
      // The API requires start_time to be populated on the Run resource during validation.
      startTime: {
        seconds: Math.floor(Date.now() / 1000),
        nanos: 0,
      },
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [response] = await client.updateRun({
      run,
      updateMask,
    });

    console.log(`Updated run: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Run not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {updateRun};
// [END datalineage_v1_lineage_run_update]
