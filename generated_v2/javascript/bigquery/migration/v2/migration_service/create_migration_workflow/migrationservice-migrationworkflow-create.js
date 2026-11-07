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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_create]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Creates a migration workflow within BigQuery Migration Service.
 */
async function createMigrationWorkflow() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us';
    const parent = client.locationPath(projectId, location);

    const migrationWorkflow = {
      displayName: 'Teradata to BigQuery Migration',
      tasks: {
        assessmentTask: {
          type: 'Translation_Teradata2BQ',
        },
      },
    };

    const request = {
      parent,
      migrationWorkflow,
    };

    const [response] = await client.createMigrationWorkflow(request);

    console.log(`Created migration workflow: ${response.name}`);
    console.log(`Workflow state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Resource already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid workflow specification: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied: ${err.message}`);
    } else {
      console.error(`Failed to create migration workflow: ${err.message}`);
    }
  }
}

module.exports = { createMigrationWorkflow };
// [END bigquerymigration_v2_migrationservice_migrationworkflow_create]
