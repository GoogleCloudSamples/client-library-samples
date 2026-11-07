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

// [START netapp_v1_netapp_backupvault_update]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Updates a NetApp backup vault.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud NetApp location/region.
 * @param {string} backupVaultId - The resource ID of the NetApp backup vault.
 */
async function updateBackupVault(projectId, locationId, backupVaultId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const backupVault = {
      name: `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}`,
      description: 'Updated description for backup vault',
    };

    const [operation] = await client.updateBackupVault({
      backupVault,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated backup vault: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup vault not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`RPC error updating backup vault: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { updateBackupVault };
// [END netapp_v1_netapp_backupvault_update]
