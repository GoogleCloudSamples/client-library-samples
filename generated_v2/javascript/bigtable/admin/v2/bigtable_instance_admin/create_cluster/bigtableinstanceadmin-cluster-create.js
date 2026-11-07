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

// [START bigtable_v2_bigtableinstanceadmin_cluster_create]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Creates a cluster in a Cloud Bigtable instance.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} instanceId ID of the instance (for example, 'example-instance-id')
 * @param {string} clusterId ID of the cluster (for example, 'example-cluster-id')
 */
async function createCluster(projectId, instanceId, clusterId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const cluster = {
      location: `projects/${projectId}/locations/us-central1-b`,
      serveNodes: 3,
      defaultStorageType: 'SSD',
    };

    const request = {
      parent,
      clusterId,
      cluster,
    };

    const [operation] = await client.createCluster(request);
    console.log(`Creation operation started: ${operation.name}`);

    const [createdCluster] = await operation.promise();
    console.log(`Cluster created: ${createdCluster.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Cluster already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Instance or resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API RPC error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected non-API error: ${err.message}`);
    }
  }
}

module.exports = { createCluster };
// [END bigtable_v2_bigtableinstanceadmin_cluster_create]
