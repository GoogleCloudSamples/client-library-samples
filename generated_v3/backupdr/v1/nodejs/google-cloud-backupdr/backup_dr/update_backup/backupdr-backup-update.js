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

// [START backupdr_v1_backupdr_backup_update]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Updates backup labels using the Backup and DR Service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the BackupDR resource (for example, 'us-central1').
 * @param {string} backupVaultId - The caller-chosen ID of the BackupVault.
 * @param {string} dataSourceId - The server-generated ID of the DataSource.
 * @param {string} backupId - The server-generated ID of the Backup.
 */
async function updateBackup(projectId, locationId, backupVaultId, dataSourceId, backupId) {
  try {
    const updateMask = {
      paths: ['labels'],
    };
    const backup = {
      name: `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}/dataSources/${dataSourceId}/backups/${backupId}`,
      labels: {
        env: 'test',
      },
    };

    const [operation] = await client.updateBackup({
      updateMask,
      backup,
    });

    const [response] = await operation.promise();

    console.log(`Backup updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`API operation failed with status ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { updateBackup };
// [END backupdr_v1_backupdr_backup_update]
