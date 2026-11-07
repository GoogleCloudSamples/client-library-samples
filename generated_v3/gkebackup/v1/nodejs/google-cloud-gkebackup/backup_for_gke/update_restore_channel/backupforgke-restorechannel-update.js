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

// [START gkebackup_v1_backupforgke_restorechannel_update]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Use the updateRestoreChannel method
 *
 * @param {string} projectId - The Google Cloud project ID containing the RestoreChannel.
 * @param {string} locationId - The Google Cloud region of the RestoreChannel.
 * @param {string} restoreChannelId - The ID of the RestoreChannel to update.
 */
async function updateRestoreChannel(projectId, locationId, restoreChannelId) {
  try {
    const restoreChannel = {
      name: `projects/${projectId}/locations/${locationId}/restoreChannels/${restoreChannelId}`,
      description: 'Updated restore channel description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      restoreChannel,
      updateMask,
    };

    const [operation] = await client.updateRestoreChannel(request);
    const [response] = await operation.promise();

    console.log(`Updated restore channel: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Restore channel not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateRestoreChannel };
// [END gkebackup_v1_backupforgke_restorechannel_update]
