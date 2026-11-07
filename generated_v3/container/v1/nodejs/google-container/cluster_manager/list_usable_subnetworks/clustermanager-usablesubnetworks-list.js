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

// [START container_v1_clustermanager_usablesubnetworks_list]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Lists usable subnetworks for a project in Google Kubernetes Engine.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listUsableSubnetworks(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [subnetworks] = await client.listUsableSubnetworks(request);

    console.log(`Usable subnetworks for ${parent}:`);
    for (const subnetwork of subnetworks) {
      console.log(`- Subnetwork: ${subnetwork.subnetwork}`);
      console.log(`  Network: ${subnetwork.network}`);
      console.log(`  IP CIDR Range: ${subnetwork.ipCidrRange}`);
      console.log(`  Secondary IP Ranges: ${subnetwork.secondaryIpRanges ? subnetwork.secondaryIpRanges.length : 0}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing subnetworks for project ${projectId}.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project resource not found for project ${projectId}.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for project ${projectId}: ${err.message}`);
    } else {
      console.error(`RPC failed with error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listUsableSubnetworks };
// [END container_v1_clustermanager_usablesubnetworks_list]
