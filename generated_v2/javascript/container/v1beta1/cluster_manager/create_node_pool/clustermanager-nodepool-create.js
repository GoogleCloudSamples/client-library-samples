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

// [START container_v1beta1_clustermanager_nodepool_create]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Creates a node pool in a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the cluster.
 * @param {string} locationId - The Google Cloud region or zone of the cluster (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The caller-specified identifier of the existing cluster.
 */
async function createNodePool(projectId, locationId, clusterId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
    const nodePool = {
      name: 'example-pool-1',
      initialNodeCount: 1,
      config: {
        machineType: 'e2-medium',
      },
    };

    const request = {
      parent,
      nodePool,
    };

    let [operation] = await client.createNodePool(request);
    console.log(`Node pool creation started: ${operation.name}`);

    const operationName = operation.name.startsWith('projects/')
      ? operation.name
      : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

    // Poll the operation until the node pool creation reaches completion.
    while (operation.status !== 'DONE' && operation.status !== 3) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      [operation] = await client.getOperation({
        name: operationName,
      });
    }

    console.log(`Node pool created successfully: ${nodePool.name}`);
    console.log(`Final operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Node pool already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Cluster or location not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createNodePool };
// [END container_v1beta1_clustermanager_nodepool_create]
