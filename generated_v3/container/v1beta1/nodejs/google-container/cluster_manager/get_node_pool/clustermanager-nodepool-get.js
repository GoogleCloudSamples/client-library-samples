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

// [START container_v1beta1_clustermanager_nodepool_get]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Retrieves details of a specific node pool in a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone of the cluster (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The identifier of the cluster.
 * @param {string} nodePoolId - The identifier of the node pool to retrieve.
 */
async function getNodePool(projectId, locationId, clusterId, nodePoolId) {
  const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;

  try {
    const request = {
      name,
    };

    const [nodePool] = await client.getNodePool(request);

    console.log(`Node pool name: ${nodePool.name}`);
    console.log(`Status: ${nodePool.status}`);
    console.log(`Kubernetes version: ${nodePool.version}`);
    console.log(`Initial node count: ${nodePool.initialNodeCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Node pool not found: ${name}`);
      return;
    }
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing node pool: ${name}`);
      return;
    }
    throw err;
  }
}

module.exports = { getNodePool };
// [END container_v1beta1_clustermanager_nodepool_get]
