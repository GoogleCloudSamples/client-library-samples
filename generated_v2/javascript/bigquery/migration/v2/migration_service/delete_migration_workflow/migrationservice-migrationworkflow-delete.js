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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_delete]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Deletes a migration workflow.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or multi-region) where the migration workflow is hosted.
 * @param {string} workflowId - The server-generated ID of the migration workflow to delete.
 */
async function deleteMigrationWorkflow(projectId, locationId, workflowId) {
  const name = `projects/${projectId}/locations/${locationId}/workflows/${workflowId}`;

  try {
    const request = {
      name,
    };

    await client.deleteMigrationWorkflow(request);
    console.log(`Deleted migration workflow: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for migration workflow: ${name}`);
    } else {
      console.error(`Failed to delete migration workflow: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteMigrationWorkflow };
// [END bigquerymigration_v2_migrationservice_migrationworkflow_delete]
