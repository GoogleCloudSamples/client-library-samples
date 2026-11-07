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

// [START backupdr_v1_backupdr_backupvault_create]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the createBackupVault method
 *
 * @param {string} backupVaultId - The ID of the BackupVault to create (between 3 and 63 characters).
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the backup vault, such as 'us-central1'.
 */
async function createBackupVault(backupVaultId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const backupVault = {
      backupMinimumEnforcedRetentionDuration: {
        seconds: 86400,
      },
    };

    const [operation] = await client.createBackupVault({
      parent,
      backupVaultId,
      backupVault,
    });

    const [response] = await operation.promise();
    console.log(`Backup vault created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup vault already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createBackupVault };
// [END backupdr_v1_backupdr_backupvault_create]
