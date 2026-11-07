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

// [START container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Fetches upgrade information for a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or zone where the cluster is located (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The ID of the GKE cluster (for example, 'example-cluster').
 */
async function fetchClusterUpgradeInfo(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
    };

    const [response] = await client.fetchClusterUpgradeInfo(request);

    console.log(`Cluster upgrade information retrieved successfully for ${name}.`);
    console.log(response);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to fetch cluster upgrade info: ${err.message}`);
    }
  }
}

module.exports = { fetchClusterUpgradeInfo };
// [END container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
