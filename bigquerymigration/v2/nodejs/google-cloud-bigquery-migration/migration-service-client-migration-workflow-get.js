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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_get]
// [START bigquerymigration_migrationservice_migrationworkflow_get]
const {MigrationServiceClient} = require('@google-cloud/bigquery-migration').v2;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Gets a previously created migration workflow.
 *
 * A migration workflow is a collection of tasks that you can create to support
 * data warehouse migration to BigQuery.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The Google Cloud location of the workflow (for example, 'us').
 * @param {string} workflowId The ID of the migration workflow (for example, '12345678-abcd-4372-a567-0e02b2c3d479').
 */
async function getMigrationWorkflow(
  projectId,
  location = 'us',
  workflowId = '12345678-abcd-4372-a567-0e02b2c3d479',
) {
  const name = client.migrationWorkflowPath(projectId, location, workflowId);
  const request = {
    name,
  };

  try {
    const [workflow] = await client.getMigrationWorkflow(request);
    console.log(`Migration workflow found: ${workflow.name}`);
    console.log(`  Display Name: ${workflow.displayName}`);
    console.log(`  State: ${workflow.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow not found: ${name}`);
    } else {
      console.error('Error getting migration workflow:', err);
    }
  }
}
// [END bigquerymigration_migrationservice_migrationworkflow_get]
// [END bigquerymigration_v2_migrationservice_migrationworkflow_get]

module.exports = {
  getMigrationWorkflow,
};
