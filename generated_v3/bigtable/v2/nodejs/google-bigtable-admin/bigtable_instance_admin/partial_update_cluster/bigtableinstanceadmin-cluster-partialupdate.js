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

// [START bigtable_v2_bigtableinstanceadmin_partial_update_cluster]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Updates a Bigtable cluster node count using a partial update.
 *
 * @param {string} projectId - The ID of the Google Cloud project hosting the cluster.
 * @param {string} instanceId - The ID of the Bigtable instance containing the cluster.
 * @param {string} clusterId - The ID of the Bigtable cluster to update.
 */
async function partialUpdateCluster(projectId, instanceId, clusterId) {
  const client = new BigtableInstanceAdminClient();

  try {
    const updateMask = {
      paths: ['serve_nodes'],
    };
    const cluster = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
      serveNodes: 3,
    };

    const [operation] = await client.partialUpdateCluster({
      cluster,
      updateMask,
    });

    const [response] = await operation.promise();

    console.log(`Cluster updated successfully: ${response.name}`);
    console.log(`Current serve nodes: ${response.serveNodes}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster update precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid cluster update argument: ${err.message}`);
    } else {
      console.error(`API error updating cluster: ${err.message}`);
    }
  }
}

module.exports = { partialUpdateCluster };
// [END bigtable_v2_bigtableinstanceadmin_partial_update_cluster]
