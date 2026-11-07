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

// [START bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Deletes a migration workflow.
 */
async function deleteMigrationWorkflow() {
  try {
    const projectId =
      process.env.PROJECT_ID ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      (await client.getProjectId().catch(() => 'example-project-id'));
    const location = process.env.LOCATION || process.env.LOCATION_ID || 'us';
    const workflowId = process.env.WORKFLOW_ID || 'example-workflow-id';
    const name =
      process.env.WORKFLOW_NAME ||
      client.migrationWorkflowPath(projectId, location, workflowId);

    const request = {
      name,
    };

    await client.deleteMigrationWorkflow(request);
    console.log(`Deleted migration workflow: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC failed with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {deleteMigrationWorkflow};
// [END bigquerymigration_v2alpha_migrationservice_migrationworkflow_delete]
