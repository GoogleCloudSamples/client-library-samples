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

// [START bigquerymigration_v2_migrationservice_migrationworkflows_list]
// [START bigquerymigration_migrationservice_migrationworkflows_list]
const {MigrationServiceClient} = require('@google-cloud/bigquery-migration').v2;
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Lists all migration workflows in a project.
 *
 * This is useful to get an overview of all migration workflows in a project and location.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} location The Google Cloud location (for example, 'us')
 */
async function listMigrationWorkflows(projectId, location = 'us') {
  const request = {
    parent: client.locationPath(projectId, location),
  };

  try {
    const [workflows] = await client.listMigrationWorkflows(request);

    if (workflows.length === 0) {
      console.log(
        `No workflows found in project ${projectId} at location ${location}.`,
      );
      return;
    }

    console.log('Workflows:');
    for (const workflow of workflows) {
      console.log(`  ${workflow.name}`);
      console.log(`    Display Name: ${workflow.displayName}`);
      console.log(`    State: ${workflow.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} or location ${location} not found.`);
    } else {
      console.error('Error listing migration workflows:', err);
    }
  }
}
// [END bigquerymigration_migrationservice_migrationworkflows_list]
// [END bigquerymigration_v2_migrationservice_migrationworkflows_list]

module.exports = {
  listMigrationWorkflows,
};
