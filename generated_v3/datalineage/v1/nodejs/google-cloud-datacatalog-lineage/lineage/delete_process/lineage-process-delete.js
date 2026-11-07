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

// [START datalineage_v1_lineage_process_delete]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the deleteProcess method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the process.
 * @param {string} processId - The identifier of the process to delete. It can be user-specified or auto-assigned; retrieve it from an existing process. Must not exceed 200 characters and contain only letters, numbers, hyphens, underscores, colons, or periods.
 */
async function deleteProcess(projectId, locationId, processId) {
  try {
    const name = client.processPath(projectId, locationId, processId);
    const request = {
      name,
    };

    // DeleteProcess is a long-running operation; wait for it to complete.
    const [operation] = await client.deleteProcess(request);
    await operation.promise();

    console.log(`Process deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Process not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteProcess };
// [END datalineage_v1_lineage_process_delete]
