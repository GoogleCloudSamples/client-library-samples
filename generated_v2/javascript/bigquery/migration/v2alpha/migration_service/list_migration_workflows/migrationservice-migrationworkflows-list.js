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

// [START bigquerystorage_v2alpha_migrationservice_migrationworkflows_list]
'use strict';

const {MigrationServiceClient} = require('@google-cloud/bigquery-migration');
const {status} = require('@grpc/grpc-js');

const client = new MigrationServiceClient();

/**
 * Lists BigQuery migration workflows in a specified project and location.
 */
async function listMigrationWorkflows() {
  try {
    const projectId = await client.getProjectId();
    const location = process.env.LOCATION || 'us';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [workflows] = await client.listMigrationWorkflows(request);
    console.log(`Found ${workflows.length} migration workflow(s).`);
    for (const workflow of workflows) {
      console.log(`Migration workflow name: ${workflow.name}`);
      console.log(`Display name: ${workflow.displayName}`);
      console.log(`State: ${workflow.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listMigrationWorkflows };
// [END bigquerystorage_v2alpha_migrationservice_migrationworkflows_list]
