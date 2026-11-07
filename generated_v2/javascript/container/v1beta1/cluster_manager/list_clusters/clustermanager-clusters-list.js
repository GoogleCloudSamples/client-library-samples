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

// [START container_v1beta1_clustermanager_clusters_list]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Lists clusters in the specified project and location.
 */
async function listClusters() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [response] = await client.listClusters(request);

    if (response.clusters && response.clusters.length > 0) {
      for (const cluster of response.clusters) {
        console.log(`Cluster: ${cluster.name}`);
      }
    } else {
      console.log('No clusters found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failure:', err.message);
    } else {
      console.error('API call failed with status:', err.code, err.message);
    }
  }
}

module.exports = { listClusters };
// [END container_v1beta1_clustermanager_clusters_list]
