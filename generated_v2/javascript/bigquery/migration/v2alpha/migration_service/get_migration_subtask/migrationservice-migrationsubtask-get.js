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

// [START bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Use the getMigrationSubtask method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the migration workflow (e.g., 'us').
 * @param {string} workflowId - The server-generated ID of the parent migration workflow.
 * @param {string} subtaskId - The server-generated ID of the migration subtask to retrieve.
 */
async function getMigrationSubtask(projectId, locationId, workflowId, subtaskId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/workflows/${workflowId}/subtasks/${subtaskId}`;

    const request = {
      name,
    };

    const [response] = await client.getMigrationSubtask(request);

    console.log(`Migration subtask retrieved: ${response.name}`);
    console.log(`State: ${response.state}`);
    console.log(`Type: ${response.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration subtask not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing migration subtask: ${err.message}`);
    } else {
      console.error(`Failed to get migration subtask: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMigrationSubtask };
// [END bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]
