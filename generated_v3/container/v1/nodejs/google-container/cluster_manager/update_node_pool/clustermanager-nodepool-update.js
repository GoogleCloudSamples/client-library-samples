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

// [START container_v1_clustermanager_nodepool_update]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates the image type and node version of a node pool in Google Kubernetes Engine.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone of the cluster (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The name of the cluster containing the node pool.
 * @param {string} nodePoolId - The name of the node pool to update.
 */
async function updateNodePool(projectId, locationId, clusterId, nodePoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;
    const imageType = 'COS_CONTAINERD';
    const nodeVersion = '-';

    // Retrieve the existing node pool to acquire the latest etag for concurrency control
    const [existingNodePool] = await client.getNodePool({name});
    const etag = existingNodePool.etag;

    const request = {
      name,
      imageType,
      nodeVersion,
      etag,
    };

    const [operation] = await client.updateNodePool(request);

    console.log(`Update node pool operation started: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Node pool or cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateNodePool };
// [END container_v1_clustermanager_nodepool_update]
