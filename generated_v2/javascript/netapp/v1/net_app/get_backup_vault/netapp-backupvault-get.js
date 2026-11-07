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

// [START netapp_v1_netapp_backupvault_get]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the getBackupVault method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the BackupVault (for example, 'us-central1').
 * @param {string} backupVaultId - The caller-specified ID of the BackupVault to retrieve.
 */
async function getBackupVault(projectId, locationId, backupVaultId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}`;

    const request = {
      name,
    };

    const [backupVault] = await client.getBackupVault(request);

    console.log(`Backup vault name: ${backupVault.name}`);
    console.log(`State: ${backupVault.state}`);
    console.log(`Create time: ${backupVault.createTime?.seconds}`);

    return backupVault;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup vault not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackupVault };
// [END netapp_v1_netapp_backupvault_get]
