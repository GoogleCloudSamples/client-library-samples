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

// [START oracledatabase_v1_oracledatabase_autonomousdatabases_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists Oracle Autonomous Databases in a project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} location_id - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listAutonomousDatabases(project_id, location_id) {
  try {
    const parent = client.locationPath(project_id, location_id);
    const request = {
      parent,
    };

    const [databases] = await client.listAutonomousDatabases(request);
    if (!databases || databases.length === 0) {
      console.log('No Autonomous Databases found.');
      return;
    }

    for (const database of databases) {
      console.log(`Database: ${database.name}`);
      console.log(`Display Name: ${database.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listAutonomousDatabases};
// [END oracledatabase_v1_oracledatabase_autonomousdatabases_list]
