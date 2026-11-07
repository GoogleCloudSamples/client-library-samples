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

// [START container_v1beta1_clustermanager_cluster_update]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates a cluster configuration and waits for the operation to complete.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone for the cluster (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The name of the cluster to update.
 */
async function updateCluster(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    // Obtain current cluster details to retrieve the etag required for concurrency control
    const [cluster] = await client.getCluster({name});

    // Update notification configuration, which completes quickly without rolling cluster nodes
    const update = {
      desiredNotificationConfig: {
        pubsub: {
          enabled: false,
        },
      },
      etag: cluster.etag,
    };

    let [operation] = await client.updateCluster({name, update});
    console.log(`Cluster update initiated. Operation name: ${operation.name}`);

    // Wait for the long-running operation to complete
    if (operation && typeof operation.promise === 'function') {
      [operation] = await operation.promise();
    } else {
      const operationName = operation.name.startsWith('projects/')
        ? operation.name
        : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

      while (operation.status !== 'DONE' && operation.status !== 3) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        [operation] = await client.getOperation({name: operationName});
      }
    }

    console.log(`Cluster updated successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster or operation not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {updateCluster};
// [END container_v1beta1_clustermanager_cluster_update]
