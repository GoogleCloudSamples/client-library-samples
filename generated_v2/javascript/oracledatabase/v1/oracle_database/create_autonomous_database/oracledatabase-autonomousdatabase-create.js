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

// [START oracledatabase_v1_oracledatabase_autonomousdatabase_create]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Use the createAutonomousDatabase method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} autonomousDatabaseId - ID of the AutonomousDatabase (for example, 'example-autonomousdatabase-id')
 */
async function createAutonomousDatabase(projectId, locationId, autonomousDatabaseId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const autonomousDatabase = {
      displayName: 'Example Autonomous Database',
      properties: {
        adminPassword: 'ExamplePassword123#',
        computeCount: 2,
        dataStorageSizeTb: 1,
        dbWorkload: 'OLTP',
        licenseType: 'LICENSE_INCLUDED',
      },
    };

    const request = {
      parent,
      autonomousDatabaseId,
      autonomousDatabase,
    };

    // Initiate the long-running operation to create the database resource
    const [operation] = await client.createAutonomousDatabase(request);
    const [response] = await operation.promise();

    console.log(`Autonomous Database created: ${response.name}`);
    return response;
  } catch (err) {
    if (
      err.reason === 'ENTITLEMENT_NOT_FOUND' ||
      (err.details && err.details.includes('marketplace order'))
    ) {
      console.error(
        'Billing account requires an active marketplace order for Oracle Database.'
      );
      return null;
    }
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `Autonomous Database already exists: ${autonomousDatabaseId}`
      );
      return null;
    }
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
      return null;
    }
    throw err;
  }
}

module.exports = { createAutonomousDatabase };
// [END oracledatabase_v1_oracledatabase_autonomousdatabase_create]
