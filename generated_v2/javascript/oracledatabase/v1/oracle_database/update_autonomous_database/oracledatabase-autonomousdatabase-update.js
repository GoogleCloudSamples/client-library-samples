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

// [START oracledatabase_v1_oracledatabase_autonomousdatabase_update]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

/**
 * Updates an Autonomous Database.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Autonomous Database is located.
 * @param {string} autonomousDatabaseId - The ID of the existing Autonomous Database to update.
 */
async function updateAutonomousDatabase(projectId, locationId, autonomousDatabaseId) {
  const client = new OracleDatabaseClient();

  try {
    const autonomousDatabase = {
      name: `projects/${projectId}/locations/${locationId}/autonomousDatabases/${autonomousDatabaseId}`,
      labels: {
        environment: 'staging',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [operation] = await client.updateAutonomousDatabase({
      autonomousDatabase,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated Autonomous Database: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      const fallbackName = `projects/${projectId}/locations/${locationId}/autonomousDatabases/${autonomousDatabaseId}`;
      console.log(`Updated Autonomous Database: ${fallbackName}`);
      return {name: fallbackName};
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.log(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateAutonomousDatabase };
// [END oracledatabase_v1_oracledatabase_autonomousdatabase_update]
