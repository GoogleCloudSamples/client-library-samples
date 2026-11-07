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

// [START container_v1beta1_clustermanager_usablesubnetworks_list]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the listUsableSubnetworks method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listUsableSubnetworks(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    // Retrieve subnetworks available for cluster creation
    const [subnetworks] = await client.listUsableSubnetworks(request);
    for (const subnetwork of subnetworks) {
      console.log(`Subnetwork: ${subnetwork.subnetwork}, Network: ${subnetwork.network}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while fetching usable subnetworks:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Requested project path was not found:', err.message);
    } else {
      console.error('Failed to list usable subnetworks:', err);
    }
  }
}

module.exports = { listUsableSubnetworks };
// [END container_v1beta1_clustermanager_usablesubnetworks_list]
