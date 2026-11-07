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

// [START workstations_v1beta_workstations_workstationcluster_update]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Use the updateWorkstationCluster method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the workstation cluster is located.
 * @param {string} workstationClusterId - The identifier of the workstation cluster to update.
 */
async function updateWorkstationCluster(projectId, locationId, workstationClusterId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };
    const workstationCluster = {
      name: `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}`,
      displayName: 'Updated Cluster',
    };

    const [operation] = await client.updateWorkstationCluster({
      workstationCluster,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated workstation cluster: ${response.name}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateWorkstationCluster };
// [END workstations_v1beta_workstations_workstationcluster_update]
