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

// [START container_v1beta1_clustermanager_set_labels]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the setLabels method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or zone) where the cluster resides.
 * @param {string} clusterId - The name/ID of the cluster.
 */
async function setLabels(projectId, locationId, clusterId) {
  try {
    const clusterName = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    // Retrieve the target cluster to acquire the latest label fingerprint.
    const [cluster] = await client.getCluster({name: clusterName});

    const labelFingerprint = cluster.labelFingerprint || '';
    const resourceLabels = {
      environment: 'development',
      tier: 'backend',
    };

    const request = {
      name: clusterName,
      resourceLabels,
      labelFingerprint,
    };

    let [operation] = await client.setLabels(request);
    console.log(`SetLabels operation initiated: ${operation.name}`);

    const operationName = operation.name.startsWith('projects/')
      ? operation.name
      : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

    // Poll the long-running operation until completion.
    while (operation.status !== 'DONE' && operation.status !== 3) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      [operation] = await client.getOperation({name: operationName});
    }

    console.log(`Labels updated for cluster: ${clusterId}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Label fingerprint mismatch or invalid resource state: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Operation aborted due to conflict: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { setLabels };
// [END container_v1beta1_clustermanager_set_labels]
