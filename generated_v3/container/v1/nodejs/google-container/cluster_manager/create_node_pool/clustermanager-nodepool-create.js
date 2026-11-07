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

// [START container_v1_clustermanager_nodepool_create]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the createNodePool method
 *
 * @param {string} projectId - The Google Cloud project ID in which the target GKE cluster resides.
 * @param {string} locationId - The Google Cloud location (region or zone) in which the target GKE cluster resides.
 * @param {string} clusterId - The name or ID of the existing cluster to which the node pool will be added.
 */
async function createNodePool(projectId, locationId, clusterId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const nodePool = {
      name: 'example-node-pool',
      initialNodeCount: 1,
      config: {
        machineType: 'e2-medium',
        diskSizeGb: 100,
      },
    };

    const request = {
      parent,
      nodePool,
    };

    let [operation] = await client.createNodePool(request);
    console.log(`Node pool creation initiated with operation: ${operation.name}`);

    const operationName = operation.name.startsWith('projects/')
      ? operation.name
      : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

    // Poll the operation until completion.
    while (operation.status !== 'DONE' && operation.status !== 'ABORTING') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      [operation] = await client.getOperation({name: operationName});
    }

    if (operation.status === 'DONE') {
      console.log(`Created node pool: ${nodePool.name}`);
    } else {
      console.error(`Operation completed with status: ${operation.status}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Node pool already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target cluster or location not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error creating node pool: ${err.message}`);
    }
  }
}

module.exports = { createNodePool };
// [END container_v1_clustermanager_nodepool_create]
