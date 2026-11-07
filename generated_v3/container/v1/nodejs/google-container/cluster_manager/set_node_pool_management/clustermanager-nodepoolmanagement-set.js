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

// [START container_v1_clustermanager_set_node_pool_management]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates node pool management settings for a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud compute zone or region of the GKE cluster (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The name or ID of the GKE cluster.
 * @param {string} nodePoolId - The name of the node pool to update management settings for.
 */
async function setNodePoolManagement(projectId, locationId, clusterId, nodePoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;
    const management = {
      autoRepair: true,
      autoUpgrade: true,
    };

    const request = {
      name,
      management,
    };

    const [operation] = await client.setNodePoolManagement(request);
    console.log(`Node pool management update initiated. Operation name: ${operation.name}`);
    return operation;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Node pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update node pool management: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { setNodePoolManagement };
// [END container_v1_clustermanager_set_node_pool_management]
