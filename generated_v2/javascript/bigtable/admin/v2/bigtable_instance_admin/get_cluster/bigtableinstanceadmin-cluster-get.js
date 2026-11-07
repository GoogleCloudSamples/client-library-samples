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

// [START bigtable_v2_bigtableinstanceadmin_cluster_get]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Retrieves details for a Cloud Bigtable cluster.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the existing Bigtable instance (for example, 'example-instance-id').
 * @param {string} clusterId - The ID of the existing Bigtable cluster to retrieve (for example, 'example-cluster-id').
 */
async function getCluster(projectId, instanceId, clusterId) {
  const name = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`;

  try {
    const request = {
      name,
    };

    const [cluster] = await client.getCluster(request);

    console.log(`Cluster name: ${cluster.name}`);
    console.log(`Location: ${cluster.location}`);
    console.log(`State: ${cluster.state}`);
    console.log(`Serve nodes: ${cluster.serveNodes}`);

    return cluster;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing cluster: ${name}`);
    } else {
      console.error(`Failed to retrieve cluster: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCluster };
// [END bigtable_v2_bigtableinstanceadmin_cluster_get]
