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

// [START oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists Autonomous Database backups in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where Oracle Database resources reside.
 */
async function listAutonomousDatabaseBackups(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listAutonomousDatabaseBackups(request);
    if (!response || response.length === 0) {
      console.log('No Autonomous Database backups found.');
      return;
    }

    for (const backup of response) {
      console.log(`Backup: ${backup.name}`);
      console.log(`Display Name: ${backup.displayName}`);
      console.log(`Autonomous Database: ${backup.autonomousDatabase}`);
      console.log(`State: ${backup.lifecycleState}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.log(
        `Marketplace order required to list Autonomous Database backups: ${err.message}`
      );
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Location or resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied: ${err.message}`);
    } else {
      console.log(`Failed to list Autonomous Database backups: ${err.message}`);
    }
  }
}

module.exports = { listAutonomousDatabaseBackups };
// [END oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
