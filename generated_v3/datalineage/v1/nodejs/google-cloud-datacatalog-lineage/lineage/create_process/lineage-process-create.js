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

// [START datalineage_v1_lineage_process_create]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Creates a Data Lineage process.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the lineage process.
 */
async function createProcess(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const process = {
      displayName: 'data-processing-pipeline',
      origin: {
        sourceType: 'CUSTOM',
        name: 'custom-pipeline-job',
      },
    };

    const request = {
      parent,
      process,
    };

    const [response] = await client.createProcess(request);
    console.log(`Created process: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Process already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create process: ${err.message}`);
    }
  }
}

module.exports = { createProcess };
// [END datalineage_v1_lineage_process_create]
