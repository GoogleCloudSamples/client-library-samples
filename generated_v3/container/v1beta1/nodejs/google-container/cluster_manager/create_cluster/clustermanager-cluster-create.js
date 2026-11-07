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

// [START container_v1beta1_clustermanager_cluster_create]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Creates a new cluster with the specified configuration.
 */
async function createCluster() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-a';
    const parent = `projects/${projectId}/locations/${location}`;

    const cluster = {
      name: 'cluster-1',
      initialNodeCount: 1,
    };

    const request = {
      parent,
      cluster,
    };

    const [operation] = await client.createCluster(request);
    console.log(`Cluster creation initiated: ${operation.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Cluster already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create cluster: ${err.message}`);
    }
  }
}

module.exports = { createCluster };
// [END container_v1beta1_clustermanager_cluster_create]
