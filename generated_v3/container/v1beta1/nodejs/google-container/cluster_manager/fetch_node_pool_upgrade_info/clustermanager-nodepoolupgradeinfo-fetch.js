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

// [START container_v1beta1_clustermanager_fetch_node_pool_upgrade_info]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Fetches upgrade information for a Google Kubernetes Engine node pool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or zone where the cluster resides (for example, 'us-central1')
 * @param {string} clusterId - ID of the cluster (for example, 'example-cluster-id')
 * @param {string} nodePoolId - ID of the node pool (for example, 'example-nodepool-id')
 */
async function fetchNodePoolUpgradeInfo(projectId, locationId, clusterId, nodePoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}/nodePools/${nodePoolId}`;
    const request = {
      name,
    };

    const [response] = await client.fetchNodePoolUpgradeInfo(request);

    console.log(`Fetched upgrade info for node pool: ${name}`);
    if (response.version) {
      console.log(`Current version: ${response.version}`);
    }
    if (response.targetVersion) {
      console.log(`Target version: ${response.targetVersion}`);
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { fetchNodePoolUpgradeInfo };
// [END container_v1beta1_clustermanager_fetch_node_pool_upgrade_info]
