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

// [START container_v1_clustermanager_cluster_get]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the getCluster method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or zone, e.g., 'us-central1' or 'us-central1-a') where the cluster is located.
 * @param {string} clusterId - The caller-chosen identifier of the cluster. Must be unique within the project and location, up to 40 characters containing lowercase letters, numbers, and hyphens, starting with a letter and ending with an alphanumeric character.
 */
async function getCluster(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
    };

    const [cluster] = await client.getCluster(request);

    console.log(`Cluster name: ${cluster.name}`);
    console.log(`Status: ${cluster.status}`);
    console.log(`Endpoint: ${cluster.endpoint}`);
    console.log(`Current master version: ${cluster.currentMasterVersion}`);
    console.log(`Current node version: ${cluster.currentNodeVersion}`);

    return cluster;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing cluster: ${err.message}`);
    } else {
      console.error(`Error retrieving cluster: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCluster };
// [END container_v1_clustermanager_cluster_get]
