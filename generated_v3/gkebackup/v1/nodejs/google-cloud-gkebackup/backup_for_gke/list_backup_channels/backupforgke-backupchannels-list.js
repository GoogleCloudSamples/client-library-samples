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

// [START gkebackup_v1_backupforgke_backupchannels_list]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Lists Backup for GKE backup channels in a location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listBackupChannels(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const request = {
      parent,
    };

    const [backupChannels] = await client.listBackupChannels(request);

    if (backupChannels.length === 0) {
      console.log('No backup channels found.');
      return;
    }

    for (const backupChannel of backupChannels) {
      console.log(`Backup channel: ${backupChannel.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource: ${parent}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { listBackupChannels };
// [END gkebackup_v1_backupforgke_backupchannels_list]
