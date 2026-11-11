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

// [START memorystore_v1_memorystore_backup_get]
'use strict';

const {MemorystoreClient} = require('@google-cloud/memorystore');
const {status} = require('@grpc/grpc-js');

const client = new MemorystoreClient();

/**
 * Retrieves details of a specific Memorystore backup.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Memorystore backup is located (for example, 'us-central1').
 * @param {string} backupCollectionId - The server-generated ID of the backup collection.
 * @param {string} backupId - The server-generated or caller-chosen ID of the backup (for example, '20240515123000_1234').
 */
async function getBackup(projectId, locationId, backupCollectionId, backupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}/backups/${backupId}`;

    const [backup] = await client.getBackup({name});

    console.log(`Retrieved backup: ${backup.name}`);
    console.log(`Backup state: ${backup.state}`);

    return backup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing backup: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackup };
// [END memorystore_v1_memorystore_backup_get]
