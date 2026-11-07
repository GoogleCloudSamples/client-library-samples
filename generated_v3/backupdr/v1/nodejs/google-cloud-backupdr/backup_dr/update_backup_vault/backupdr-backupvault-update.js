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

// [START backupdr_v1_backupdr_backupvault_update]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Updates the description of an existing backup vault.
 *
 * @param {string} projectId - Google Cloud project ID hosting the backup vault.
 * @param {string} locationId - Google Cloud region hosting the backup vault.
 * @param {string} backupVaultId - Identifier of the existing backup vault.
 */
async function updateBackupVault(projectId, locationId, backupVaultId) {
  try {
    const backupVault = {
      name: `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      backupVault,
      updateMask,
    };

    // Retry the update when the resource is provisioning and returns ABORTED.
    const maxRetries = 24;
    let response;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const [operation] = await client.updateBackupVault(request);
        [response] = await operation.promise();
        break;
      } catch (err) {
        if (err.code === status.ABORTED && attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
          throw err;
        }
      }
    }

    console.log(`Backup vault updated: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup vault not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Backup vault operation aborted: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {updateBackupVault};
// [END backupdr_v1_backupdr_backupvault_update]
