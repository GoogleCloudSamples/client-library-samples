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

// [START bigtable_v2_bigtableinstanceadmin_cluster_delete]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Deletes a cluster from a Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the parent Bigtable instance (for example, 'example-instance-id').
 * @param {string} clusterId - The ID of the cluster to delete (for example, 'example-cluster-id').
 */
async function deleteCluster(projectId, instanceId, clusterId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`;
    const request = {
      name,
    };

    await client.deleteCluster(request);
    console.log(`Cluster deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster cannot be deleted due to precondition: ${err.message}`);
    } else {
      console.error(`Failed to delete cluster with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {deleteCluster};
// [END bigtable_v2_bigtableinstanceadmin_cluster_delete]
