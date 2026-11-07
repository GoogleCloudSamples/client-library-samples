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

// [START workstations_v1_workstations_usableworkstationconfigs_list]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Use the listUsableWorkstationConfigs method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the workstation cluster (for example, 'us-central1').
 * @param {string} workstationClusterId - The ID of the workstation cluster.
 */
async function listUsableWorkstationConfigs(projectId, locationId, workstationClusterId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}`;

    const request = {
      parent,
    };

    const [configs] = await client.listUsableWorkstationConfigs(request);

    for (const config of configs) {
      console.log(`Workstation configuration: ${config.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workstation cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { listUsableWorkstationConfigs };
// [END workstations_v1_workstations_usableworkstationconfigs_list]
