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

// [START netapp_v1_netapp_backuppolicy_create]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the createBackupPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupPolicyId - ID of the BackupPolicy (for example, 'example-backuppolicy-id')
 */
async function createBackupPolicy(projectId, locationId, backupPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const backupPolicy = {
      dailyBackupLimit: 2,
      weeklyBackupLimit: 1,
      monthlyBackupLimit: 1,
      description: 'Example NetApp backup policy',
      enabled: true,
    };

    const [operation] = await client.createBackupPolicy({
      parent,
      backupPolicyId,
      backupPolicy,
    });
    const [response] = await operation.promise();

    console.log(`Backup policy created: ${response.name}`);
    console.log(`Backup policy state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { createBackupPolicy };
// [END netapp_v1_netapp_backuppolicy_create]
