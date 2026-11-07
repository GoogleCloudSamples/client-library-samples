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

// [START alloydb_v1alpha_alloydbadmin_cluster_get]
'use strict';

const {AlloyDBAdminClient} = require('@google-cloud/alloydb');
const {status} = require('@grpc/grpc-js');

const client = new AlloyDBAdminClient();

/**
 * Retrieves details of an AlloyDB cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the AlloyDB cluster is located (for example, 'us-central1').
 * @param {string} clusterId - The identifier of the AlloyDB cluster to retrieve.
 */
async function getCluster(projectId, locationId, clusterId) {
  try {
    const name = client.clusterPath(projectId, locationId, clusterId);
    const request = {
      name,
    };

    const [cluster] = await client.getCluster(request);

    console.log(`Retrieved cluster: ${cluster.name}`);
    console.log(`Cluster state: ${cluster.state}`);
    console.log(`Database version: ${cluster.databaseVersion}`);
    return cluster;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve cluster: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCluster };
// [END alloydb_v1alpha_alloydbadmin_cluster_get]
