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

// [START redis_v1_cloudrediscluster_backup_delete]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Use the deleteBackup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis cluster backup collection is located (for example, 'us-central1').
 * @param {string} backupCollectionId - The server-generated ID of the backup collection. Read this value from an existing resource (for example, via ListBackupCollections or the parent cluster's backup_collection attribute).
 * @param {string} backupId - The identifier of the backup to delete (for example, '20240515123000_1234'). Read from an existing resource (for example, via ListBackups). Do not use version aliases.
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
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Error deleting backup: ${err.message}`);
    }
  }
}

module.exports = { deleteBackup };
// [END redis_v1_cloudrediscluster_backup_delete]
