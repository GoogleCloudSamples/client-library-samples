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

// [START bigtable_v2_bigtableinstanceadmin_clusters_list]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Lists Bigtable clusters in a specified instance or across all instances in a project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the Bigtable instance (for example, 'example-instance-id'), or '-' to list clusters across all instances in the project.
 */
async function listClusters(projectId, instanceId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;

    const request = {
      parent,
    };

    const [response] = await client.listClusters(request);
    const clusters = response.clusters || [];

    console.log(`Clusters in ${parent}:`);
    for (const cluster of clusters) {
      console.log(`- Name: ${cluster.name}`);
      console.log(`  Location: ${cluster.location}`);
      console.log(`  Serve nodes: ${cluster.serveNodes}`);
      console.log(`  Default storage type: ${cluster.defaultStorageType}`);
    }

    return clusters;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error (${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listClusters };
// [END bigtable_v2_bigtableinstanceadmin_clusters_list]
