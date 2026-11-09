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

// [START redis_v1_cloudrediscluster_backups_list]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Use the listBackups method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupCollectionId - ID of the BackupCollection (for example, 'example-backupcollection-id')
 */
async function listBackups(projectId, locationId, backupCollectionId) {
  try {
    const parent = client.backupCollectionPath(
      projectId,
      locationId,
      backupCollectionId
    );

    const request = {
      parent,
    };

    const [backups] = await client.listBackups(request);

    console.log(`Found ${backups.length} backup(s):`);
    for (const backup of backups) {
      console.log(`Backup: ${backup.name}`);
      console.log(`State: ${backup.state}`);
      console.log(`Total size: ${backup.totalSizeBytes} bytes`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup collection not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listBackups };
// [END redis_v1_cloudrediscluster_backups_list]
