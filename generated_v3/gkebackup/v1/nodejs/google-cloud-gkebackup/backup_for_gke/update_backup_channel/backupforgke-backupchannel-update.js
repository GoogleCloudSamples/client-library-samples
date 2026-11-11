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

// [START gkebackup_v1_backupforgke_backupchannel_update]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Updates an existing BackupChannel resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the BackupChannel resides.
 * @param {string} backupChannelId - The identifier of the BackupChannel to update.
 */
async function updateBackupChannel(projectId, locationId, backupChannelId) {
  try {
    const backupChannel = {
      name: `projects/${projectId}/locations/${locationId}/backupChannels/${backupChannelId}`,
      description: 'Updated description for the backup channel',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      backupChannel,
      updateMask,
    };

    const [operation] = await client.updateBackupChannel(request);
    const [response] = await operation.promise();

    console.log(`Updated BackupChannel: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`BackupChannel not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { updateBackupChannel };
// [END gkebackup_v1_backupforgke_backupchannel_update]
