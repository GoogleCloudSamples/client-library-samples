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

// [START container_v1beta1_clustermanager_set_addons_config]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the setAddonsConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone for the cluster (e.g., 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - The name of the cluster.
 */
async function setAddonsConfig(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    // Retrieve the existing cluster configuration to preserve current addons
    const [cluster] = await client.getCluster({name});

    // Update addons configuration with NodeLocal DNSCache enabled
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

    const [operation] = await client.setAddonsConfig(request);
    console.log(`Submitted update operation: ${operation.name}`);

    const operationName = operation.name.startsWith('projects/')
      ? operation.name
      : `projects/${projectId}/locations/${locationId}/operations/${operation.name}`;

    // Poll until the long-running operation completes
    let [op] = await client.getOperation({name: operationName});
    while (op.status !== 'DONE' && op.status !== 3) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      [op] = await client.getOperation({name: operationName});
    }

    console.log(`Addons configuration updated successfully for cluster: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { setAddonsConfig };
// [END container_v1beta1_clustermanager_set_addons_config]
