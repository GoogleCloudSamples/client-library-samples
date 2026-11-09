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

// [START container_v1_clustermanager_set_addons_config]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates addons configuration on a GKE cluster.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud region or zone (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - Name of the cluster.
 */
async function setAddonsConfig(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    // Retrieve current configuration to preserve existing settings during replacement
    const [cluster] = await client.getCluster({name});
    const addonsConfig = {
      ...cluster.addonsConfig,
      dnsCacheConfig: {
        enabled: true,
      },
    };

    const request = {
      name,
      addonsConfig,
    };

    console.log(`Updating addons configuration for cluster: ${name}`);
    const [operation] = await client.setAddonsConfig(request);

    const operationName = operation.name.startsWith('projects/')
      ? operation.name
      : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

    let currentOperation = operation;
    while (currentOperation.status !== 'DONE' && currentOperation.status !== 3) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      [currentOperation] = await client.getOperation({name: operationName});
    }

    console.log(`Addons configuration updated. Operation status: ${currentOperation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { setAddonsConfig };
// [END container_v1_clustermanager_set_addons_config]
