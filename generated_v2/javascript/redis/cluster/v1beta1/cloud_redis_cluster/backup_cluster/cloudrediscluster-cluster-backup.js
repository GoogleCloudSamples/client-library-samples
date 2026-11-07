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

// [START redis_v1beta1_cloudrediscluster_backup_cluster]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Initiates a backup of a Redis cluster and waits for the operation to complete.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis cluster is located (for example, 'us-central1').
 * @param {string} clusterId - The ID of an existing Redis cluster to back up (for example, 'example-cluster').
 */
async function backupCluster(projectId, locationId, clusterId) {
  try {
    const name = client.clusterPath(projectId, locationId, clusterId);

    const request = {
      name,
    };

    const [operation] = await client.backupCluster(request);
    const [response] = await operation.promise();

    console.log(`Cluster backup completed successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster state invalid for backup: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Backup operation failed: ${err.message}`);
    }
  }
}

module.exports = { backupCluster };
// [END redis_v1beta1_cloudrediscluster_backup_cluster]
