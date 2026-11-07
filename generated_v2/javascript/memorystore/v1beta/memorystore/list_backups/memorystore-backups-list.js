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

// [START memorystore_v1beta_memorystore_backups_list]
'use strict';

const {MemorystoreClient} = require('@google-cloud/memorystore');
const {status} = require('@grpc/grpc-js');

const client = new MemorystoreClient();

/**
 * Lists backups in a Memorystore backup collection.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} backupCollectionId - The server-generated ID of the backup collection.
 */
async function listBackups(projectId, locationId, backupCollectionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}`;
    const [backups] = await client.listBackups({parent});

    if (!backups || backups.length === 0) {
      console.log('No backups found.');
      return;
    }

    for (const backup of backups) {
      console.log(`Backup name: ${backup.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list backups: ${err.message}`);
    }
  }
}

module.exports = { listBackups };
// [END memorystore_v1beta_memorystore_backups_list]
