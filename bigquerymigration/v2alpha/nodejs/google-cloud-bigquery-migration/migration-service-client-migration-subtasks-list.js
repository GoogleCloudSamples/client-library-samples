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

// [START bigquerymigration_v2alpha_migrationservice_migrationsubtasks_list]
const {MigrationServiceClient} =
  require('@google-cloud/bigquery-migration').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Lists all migration subtasks for a given workflow.
 *
 * This is useful to track the progress of a migration by by examining its
 * individual steps.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud location (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow (for example, '123e4567-e89b-42d3-a456-426614174000').
 */
async function listMigrationSubtasks(projectId, location, workflowId) {
  // Path: projects/{projectId}/locations/{location}/workflows/{workflowId}
  const parent = client.migrationWorkflowPath(projectId, location, workflowId);
  const request = {
    parent,
  };

  try {
    const [subtasks] = await client.listMigrationSubtasks(request);

    if (subtasks.length === 0) {
      console.log(`No migration subtasks found for workflow: ${workflowId}`);
      return;
    }

    console.log(`Migration Subtasks for workflow: ${workflowId}`);
    for (const subtask of subtasks) {
      console.log(`  Name: ${subtask.name}`);
      console.log(`  Type: ${subtask.type}`);
      console.log(`  State: ${subtask.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow not found: ${workflowId}`);
    } else {
      console.error('Error listing migration subtasks:', err);
    }
  }
}
// [END bigquerymigration_v2alpha_migrationservice_migrationsubtasks_list]

module.exports = {
  listMigrationSubtasks,
};
