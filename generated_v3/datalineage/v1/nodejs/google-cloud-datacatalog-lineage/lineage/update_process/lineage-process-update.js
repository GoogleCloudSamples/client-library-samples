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

// [START datalineage_v1_lineage_process_update]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the updateProcess method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the lineage process.
 * @param {string} locationId - The Google Cloud region where the lineage process is located.
 * @param {string} processId - The ID of the lineage process to update. May be caller-specified or server-generated; obtain it from an existing process. Must be up to 200 characters and contain only 'a-zA-Z0-9_-:.'.
 */
async function updateProcess(projectId, locationId, processId) {
  try {
    const processName = `projects/${projectId}/locations/${locationId}/processes/${processId}`;

    const process = {
      name: processName,
      displayName: 'Updated Process Display Name',
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      process,
      updateMask,
    };

    const [response] = await client.updateProcess(request);
    console.log(`Updated process: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Process not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update process: ${err.message}`);
    }
  }
}

module.exports = { updateProcess };
// [END datalineage_v1_lineage_process_update]
