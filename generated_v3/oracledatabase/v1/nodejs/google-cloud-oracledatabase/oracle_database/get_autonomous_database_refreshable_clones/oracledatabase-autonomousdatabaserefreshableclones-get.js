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

// [START oracledatabase_v1_oracledatabase_autonomousdatabaserefreshableclones_get]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Retrieves refreshable clones for an Autonomous Database.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} autonomousDatabaseId - The caller-chosen ID of the existing Autonomous Database (for example, 'example-autonomous-database'). Restricted to '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
 */
async function getAutonomousDatabaseRefreshableClones(projectId, locationId, autonomousDatabaseId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/autonomousDatabases/${autonomousDatabaseId}`;
    const [response] = await client.getAutonomousDatabaseRefreshableClones({
      name,
    });

    console.log(`Retrieved refreshable clones for ${name}:`);
    console.log(JSON.stringify(response, null, 2));
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Autonomous Database not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { getAutonomousDatabaseRefreshableClones };
// [END oracledatabase_v1_oracledatabase_autonomousdatabaserefreshableclones_get]
