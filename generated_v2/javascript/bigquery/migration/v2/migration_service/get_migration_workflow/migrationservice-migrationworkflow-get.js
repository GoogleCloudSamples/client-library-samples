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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_get]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Retrieves an existing migration workflow.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The region or multi-region location of the migration workflow (for example, 'us').
 * @param {string} workflowId - The server-generated ID of the migration workflow.
 */
async function getMigrationWorkflow(projectId, locationId, workflowId) {
  try {
    // Construct the fully-qualified resource name
    const name = `projects/${projectId}/locations/${locationId}/workflows/${workflowId}`;

    const request = {
      name,
    };

    const [workflow] = await client.getMigrationWorkflow(request);

    console.log(`Migration workflow name: ${workflow.name}`);
    console.log(`Display name: ${workflow.displayName}`);
    console.log(`State: ${workflow.state}`);

    return workflow;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Migration workflow not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMigrationWorkflow };
// [END bigquerymigration_v2_migrationservice_migrationworkflow_get]
