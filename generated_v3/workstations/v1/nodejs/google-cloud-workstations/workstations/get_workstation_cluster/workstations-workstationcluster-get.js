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

// [START workstations_v1_workstations_workstationcluster_get]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Retrieves details for a workstation cluster.
 *
 * @param {string} projectId - The Google Cloud project ID where the workstation cluster is located.
 * @param {string} locationId - The Google Cloud region where the workstation cluster resides (for example, 'us-central1').
 * @param {string} workstationClusterId - The caller-specified identifier of the existing workstation cluster to retrieve.
 */
async function getWorkstationCluster(projectId, locationId, workstationClusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}`;
    const [cluster] = await client.getWorkstationCluster({name});

    console.log(`Retrieved workstation cluster: ${cluster.name}`);
    return cluster;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workstation cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing workstation cluster: ${err.message}`);
    } else {
      console.error(`Failed to retrieve workstation cluster: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getWorkstationCluster };
// [END workstations_v1_workstations_workstationcluster_get]
