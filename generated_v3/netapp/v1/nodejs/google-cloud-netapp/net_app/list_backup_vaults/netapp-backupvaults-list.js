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

// [START netapp_v1_netapp_backupvaults_list]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Lists NetApp backup vaults in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listBackupVaults(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [backupVaults] = await client.listBackupVaults(request);

    console.log(`Found ${backupVaults.length} backup vault(s).`);
    for (const backupVault of backupVaults) {
      console.log(`Backup Vault: ${backupVault.name}`);
      console.log(`State: ${backupVault.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackupVaults };
// [END netapp_v1_netapp_backupvaults_list]
