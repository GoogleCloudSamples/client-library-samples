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

// [START datalineage_v1_lineage_run_create]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the createRun method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the lineage resource.
 * @param {string} processId - The ID of the parent Lineage process.
 */
async function createRun(projectId, locationId, processId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/processes/${processId}`;
    const run = {
      displayName: 'example-run',
      state: 'STARTED',
      startTime: {
        seconds: Math.floor(Date.now() / 1000),
        nanos: 0,
      },
    };

    const [createdRun] = await client.createRun({
      parent,
      run,
    });

    console.log(`Created run: ${createdRun.name}`);
    console.log(`State: ${createdRun.state}`);
    return createdRun;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent process not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Run already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create run: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createRun };
// [END datalineage_v1_lineage_run_create]
