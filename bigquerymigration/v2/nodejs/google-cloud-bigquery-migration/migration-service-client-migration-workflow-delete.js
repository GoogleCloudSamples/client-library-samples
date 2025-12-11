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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_delete]
// [START bigquerymigration_migrationservice_migrationworkflow_delete]
const {MigrationServiceClient} = require('@google-cloud/bigquery-migration').v2;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Deletes a migration workflow by name.
 *
 * This is useful to clean up migration resources that are no longer needed.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The workflow's location (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow to delete (for example, '12345678-abcd-4372-a567-0e02b2c3d479').
 */
async function deleteMigrationWorkflow(
  projectId,
  location = 'us',
  workflowId = '12345678-abcd-4372-a567-0e02b2c3d479',
) {
  const name = client.migrationWorkflowPath(projectId, location, workflowId);

  const request = {
    name,
  };

  try {
    await client.deleteMigrationWorkflow(request);
    console.log(`Migration workflow ${workflowId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow ${workflowId} not found.`);
    } else {
      console.error(
        'An error occurred while deleting the migration workflow:',
        err,
      );
    }
  }
}
// [END bigquerymigration_migrationservice_migrationworkflow_delete]
// [END bigquerymigration_v2_migrationservice_migrationworkflow_delete]

module.exports = {
  deleteMigrationWorkflow,
};
