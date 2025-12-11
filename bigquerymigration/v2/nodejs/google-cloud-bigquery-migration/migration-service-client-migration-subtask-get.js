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

// [START bigquerymigration_v2_migrationservice_migrationsubtask_get]
// [START bigquerymigration_migrationservice_migrationsubtask_get]
const {MigrationServiceClient} = require('@google-cloud/bigquery-migration').v2;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Gets a previously created migration subtask.
 *
 * A migration subtask is a single unit of work that is part of a migration workflow.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud region where the migration workflow is located (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow that contains the subtask (for example, '12345678-abcd-4372-a567-0e02b2c3d479').
 * @param {string} subtaskId The ID of the migration subtask to retrieve (for example, '98765432-dcba-4370-971e-7ff74afce823').
 */
async function getMigrationSubtask(
  projectId,
  location = 'us',
  workflowId = '12345678-abcd-4372-a567-0e02b2c3d479',
  subtaskId = '98765432-dcba-4370-971e-7ff74afce823',
) {
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

    console.log(`Migration subtask found: ${subtask.name}`);
    console.log(`  Type: ${subtask.type}`);
    console.log(`  State: ${subtask.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration subtask not found: ${name}`);
    } else {
      console.error('Error getting migration subtask:', err);
    }
  }
}
// [END bigquerymigration_migrationservice_migrationsubtask_get]
// [END bigquerymigration_v2_migrationservice_migrationsubtask_get]

module.exports = {
  getMigrationSubtask,
};
