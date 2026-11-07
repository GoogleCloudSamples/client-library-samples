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

// [START netapp_v1_netapp_backupvault_delete]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the deleteBackupVault method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupVaultId - ID of the BackupVault (for example, 'example-backupvault-id')
 */
async function deleteBackupVault(projectId, locationId, backupVaultId) {
  try {
    const name = client.backupVaultPath(projectId, locationId, backupVaultId);

    const [operation] = await client.deleteBackupVault({
      name,
    });
    await operation.promise();

    console.log(`Backup vault deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup vault not found: ${err.message}`);
    } else {
      console.error(`Failed to delete backup vault: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackupVault };
// [END netapp_v1_netapp_backupvault_delete]
