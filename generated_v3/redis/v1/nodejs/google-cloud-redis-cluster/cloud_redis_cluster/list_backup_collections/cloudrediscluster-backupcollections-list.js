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

// [START redis_v1_cloudrediscluster_backupcollections_list]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Use the listBackupCollections method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region to list backup collections in, or '-' to list across all locations (for example, 'us-central1').
 */
async function listBackupCollections(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [backupCollections] = await client.listBackupCollections(request);

    if (!backupCollections || backupCollections.length === 0) {
      console.log('No backup collections found.');
      return;
    }

    for (const backupCollection of backupCollections) {
      console.log(`Backup Collection: ${backupCollection.name}`);
      console.log(`Cluster: ${backupCollection.cluster}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackupCollections };
// [END redis_v1_cloudrediscluster_backupcollections_list]
