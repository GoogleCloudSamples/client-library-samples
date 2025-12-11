// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]
const {MigrationServiceClient} =
  require('@google-cloud/bigquery-migration').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Gets a previously created migration subtask.
 *
 * A migration subtask is a single unit of work that is part of a migration workflow.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud location for the migration workflow (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow (for example, '123e4567-e89b-42d3-a456-426614174000').
 * @param {string} subtaskId The ID of the migration subtask (for example, '89ab12cd-ef34-46gh-ij78-90kl12mn34op').
 */
async function getMigrationSubtask(
  projectId,
  location = 'us',
  workflowId = '123e4567-e89b-12d3-a456-426614174000',
  subtaskId = '89ab12cd-ef34-56gh-ij78-90kl12mn34op',
) {
  // Path: projects/{projectId}/locations/{location}/workflows/{workflowId}/subtasks/{subtaskId}
  const name = client.migrationSubtaskPath(
    projectId,
    location,
    workflowId,
    subtaskId,
  );
  const request = {
    name,
  };

  try {
    const [subtask] = await client.getMigrationSubtask(request);

    console.log(`Migration subtask name: ${subtask.name}`);
    console.log(`  Type: ${subtask.type}`);
    console.log(`  State: ${subtask.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Migration subtask ${subtaskId} not found in workflow ${workflowId} in location ${location}.`,
      );
    } else {
      console.error(`Error getting migration subtask ${subtaskId}:`, err);
    }
  }
}
// [END bigquerymigration_v2alpha_migrationservice_migrationsubtask_get]

module.exports = {
  getMigrationSubtask,
};
