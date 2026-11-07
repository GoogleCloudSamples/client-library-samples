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

// [START memorystore_v1beta_memorystore_backup_delete]
'use strict';

const {MemorystoreClient} = require('@google-cloud/memorystore');
const {status} = require('@grpc/grpc-js');

const client = new MemorystoreClient();

/**
 * Use the deleteBackup method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupCollectionId - ID of the BackupCollection (for example, 'example-backupcollection-id')
 * @param {string} backupId - ID of the Backup (for example, 'example-backup-id')
 */
async function deleteBackup(projectId, locationId, backupCollectionId, backupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}/backups/${backupId}`;

    const [operation] = await client.deleteBackup({name});
    await operation.promise();

    console.log(`Deleted backup: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code: ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error deleting backup: ${err}`);
    }
  }
}

module.exports = { deleteBackup };
// [END memorystore_v1beta_memorystore_backup_delete]
