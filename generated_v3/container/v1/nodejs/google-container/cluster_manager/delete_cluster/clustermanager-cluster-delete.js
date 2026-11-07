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

// [START container_v1_clustermanager_cluster_delete]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the deleteCluster method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud zone or region in which the cluster resides (for example, 'us-central1-a' or 'us-central1').
 * @param {string} clusterId - The identifier of the cluster to delete. Must be 1 to 40 characters, start with a letter, end with an alphanumeric character, and contain only lowercase letters, numbers, and hyphens.
 */
async function deleteCluster(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
    const request = {
      name,
    };

    const [operation] = await client.deleteCluster(request);
    console.log(`Cluster deletion initiated. Operation name: ${operation.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster cannot be deleted in current state: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Failed to delete cluster: ${err}`);
    }
  }
}

module.exports = { deleteCluster };
// [END container_v1_clustermanager_cluster_delete]
