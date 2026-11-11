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

// [START datalineage_v1_lineage_processes_list]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Lists lineage processes in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 */
async function listProcesses(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [processes] = await client.listProcesses(request);
    console.log('Processes:');
    for (const process of processes) {
      console.log(`- Name: ${process.name}`);
      console.log(`  Display Name: ${process.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: projects/${projectId}/locations/${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for projects/${projectId}/locations/${locationId}`);
    } else {
      console.error(`Error listing processes: ${err.message}`);
    }
  }
}

module.exports = { listProcesses };
// [END datalineage_v1_lineage_processes_list]
