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

// [START container_v1_clustermanager_rollback_node_pool_upgrade]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Rolls back a node pool upgrade in a Google Kubernetes Engine cluster.
 */
async function rollbackNodePoolUpgrade() {
  const projectId = await client.getProjectId();
  const location = 'us-central1-a';
  const clusterId = 'cluster-1';
  const nodePoolId = 'default-pool';

  // Construct the resource name for the target node pool
  const name = `projects/${projectId}/locations/${location}/clusters/${clusterId}/nodePools/${nodePoolId}`;

  const request = {
    name,
  };

  try {
    const [operation] = await client.rollbackNodePoolUpgrade(request);
    console.log(`Rollback initiated. Operation: ${operation.name}, Status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster or node pool resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot roll back node pool upgrade: ${err.message}`);
    } else if (err.code) {
      console.error(`API error occurred with gRPC code ${err.code}: ${err.message}`);
    } else {
      console.error(`Encountered unexpected error: ${err.message}`);
    }
  }
}

module.exports = { rollbackNodePoolUpgrade };
// [END container_v1_clustermanager_rollback_node_pool_upgrade]
