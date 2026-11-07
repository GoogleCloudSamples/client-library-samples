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

// [START redis_v1_cloudrediscluster_backup_get]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Retrieves details of a specific Redis cluster backup.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis cluster and backup reside (for example, 'us-central1').
 * @param {string} backupCollectionId - The identifier of the backup collection.
 * @param {string} backupId - The identifier of the backup to retrieve.
 */
async function getBackup(projectId, locationId, backupCollectionId, backupId) {
  const name = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}/backups/${backupId}`;

  const request = {
    name,
  };

  try {
    const [backup] = await client.getBackup(request);
    console.log(`Retrieved backup: ${backup.name}`);
    console.log(`Backup state: ${backup.state}`);
    console.log(`Backup create time: ${backup.createTime ? new Date(backup.createTime.seconds * 1000).toISOString() : 'N/A'}`);
    return backup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${name}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for backup: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing backup: ${name}`);
    } else {
      console.error(`Failed to retrieve backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackup };
// [END redis_v1_cloudrediscluster_backup_get]
