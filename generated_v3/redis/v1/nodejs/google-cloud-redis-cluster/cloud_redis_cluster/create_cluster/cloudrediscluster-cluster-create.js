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

// [START redis_v1_cloudrediscluster_cluster_create]
'use strict';

const {CloudRedisClusterClient} = require('@google-cloud/redis-cluster');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClusterClient();

/**
 * Use the createCluster method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} clusterId - ID of the Cluster (for example, 'example-cluster-id')
 */
async function createCluster(projectId, locationId, clusterId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const cluster = {
      shardCount: 3,
      pscConfigs: [
        {
          network: `projects/${projectId}/global/networks/default`,
        },
      ],
    };

    const request = {
      parent,
      clusterId,
      cluster,
    };

    const [operation] = await client.createCluster(request);
    const [response] = await operation.promise();

    console.log(`Cluster created successfully: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Cluster ${clusterId} already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating cluster: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid cluster configuration: ${err.message}`);
    } else {
      console.error(`Google API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { createCluster };
// [END redis_v1_cloudrediscluster_cluster_create]
