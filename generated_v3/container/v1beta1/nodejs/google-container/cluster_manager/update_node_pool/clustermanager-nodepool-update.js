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

// [START container_v1beta1_clustermanager_nodepool_update]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates a node pool in a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone for the cluster.
 * @param {string} clusterId - The ID of the existing GKE cluster.
 * @param {string} nodePoolId - The ID of the existing node pool to update.
 */
async function updateNodePool(projectId, locationId, clusterId, nodePoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;

    // Obtain the current node pool to capture its entity tag for concurrent update safety.
    const [existingNodePool] = await client.getNodePool({name});

    const imageType = 'COS_CONTAINERD';
    const nodeVersion = '-';
    const etag = existingNodePool.etag;

    const request = {
      name,
      nodeVersion,
      imageType,
      etag,
    };

    const [operation] = await client.updateNodePool(request);
    console.log(`Update node pool operation initiated: ${operation.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Node pool not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateNodePool };
// [END container_v1beta1_clustermanager_nodepool_update]
