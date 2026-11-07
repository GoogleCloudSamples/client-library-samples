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

// [START redis_v1beta1_cloudrediscluster_backupcollection_get]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Gets details of a backup collection.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupCollectionId - Server-generated identifier of the backup collection (for example, 'example-backupcollection-id'). Obtain this ID from the cluster's backup_collection attribute or by calling ListBackupCollections.
 */
async function getBackupCollection(projectId, locationId, backupCollectionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}`;

    const [response] = await client.getBackupCollection({name});
    console.log(`Backup collection name: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup collection not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to get backup collection: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackupCollection };
// [END redis_v1beta1_cloudrediscluster_backupcollection_get]
