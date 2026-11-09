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

// [START container_v1_clustermanager_nodepool_delete]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the deleteNodePool method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone where the cluster resides.
 * @param {string} clusterId - The caller-chosen name of the cluster.
 * @param {string} nodePoolId - The caller-chosen name of the node pool to delete.
 */
async function deleteNodePool(projectId, locationId, clusterId, nodePoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;

    const request = {
      name,
    };

    // Deleting a node pool starts a long-running cluster management operation
    const [operation] = await client.deleteNodePool(request);
    console.log(`Node pool deletion initiated for: ${name}`);
    console.log(`Operation name: ${operation.name}`);
    console.log(`Current operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Node pool not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Condition not met to delete node pool: ${err.message}`);
    } else {
      console.error(`API error during node pool deletion: ${err.message}`);
    }
  }
}

module.exports = { deleteNodePool };
// [END container_v1_clustermanager_nodepool_delete]
