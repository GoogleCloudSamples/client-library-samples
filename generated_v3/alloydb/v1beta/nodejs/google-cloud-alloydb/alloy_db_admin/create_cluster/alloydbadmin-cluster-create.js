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

// [START alloydb_v1beta_alloydbadmin_cluster_create]
'use strict';

const {AlloyDBAdminClient} = require('@google-cloud/alloydb');
const {status} = require('@grpc/grpc-js');

const client = new AlloyDBAdminClient();

/**
 * Creates an AlloyDB cluster.
 *
 * @param {string} clusterId - ID of the cluster to create.
 */
async function createCluster(clusterId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-east1';
    const parent = client.locationPath(projectId, location);
    const cluster = {
      networkConfig: {
        network: `projects/${projectId}/global/networks/default`,
      },
    };

    const request = {
      parent,
      clusterId,
      cluster,
    };

    const [operation] = await client.createCluster(request);
    const [response] = await operation.promise();
    console.log(`Created cluster: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Cluster ${clusterId} already exists.`);
    } else if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error('Quota limit reached for region:', err.message);
    } else {
      console.error('Failed to create cluster:', err);
    }
  }
}

module.exports = { createCluster };
// [END alloydb_v1beta_alloydbadmin_cluster_create]
