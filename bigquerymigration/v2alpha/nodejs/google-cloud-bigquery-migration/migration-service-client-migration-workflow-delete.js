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

// [START bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]
const {MigrationServiceClient} =
  require('@google-cloud/bigquery-migration').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Deletes a migration workflow by name.
 *
 * This is useful to clean up migration resources that are no longer needed.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud region (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow to delete (for example, '123e4567-e89b-42d3-a456-426614174000').
 */
async function deleteMigrationWorkflow(
  projectId,
  location = 'us',
  workflowId = '123e4567-e89b-42d3-a456-426614174000',
) {
  const name = client.migrationWorkflowPath(projectId, location, workflowId);
  const request = {
    name,
  };

  try {
    await client.deleteMigrationWorkflow(request);
    console.log(`Workflow ${workflowId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Workflow ${workflowId} not found in project ${projectId} at location ${location}.`,
      );
    } else {
      console.error(`Error deleting workflow ${workflowId}:`, err);
    }
  }
}
// [END bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]

module.exports = {
  deleteMigrationWorkflow,
};
