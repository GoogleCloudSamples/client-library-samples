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

// [START datalineage_v1_lineage_run_get]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the getRun method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 * @param {string} processId - The ID of the parent lineage process.
 * @param {string} runId - The ID of the lineage run to retrieve.
 */
async function getRun(projectId, locationId, processId, runId) {
  try {
    // Construct the composite resource identifier for the lineage run
    const name = `projects/${projectId}/locations/${locationId}/processes/${processId}/runs/${runId}`;

    const [run] = await client.getRun({name});

    console.log(`Run name: ${run.name}`);
    console.log(`Run state: ${run.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Lineage run not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing lineage run: ${err.message}`);
    } else {
      console.error(`Lineage API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRun };
// [END datalineage_v1_lineage_run_get]
