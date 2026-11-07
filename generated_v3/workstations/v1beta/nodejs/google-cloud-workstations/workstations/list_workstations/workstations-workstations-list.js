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

// [START workstations_v1beta_workstations_workstations_list]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Lists the workstations in a workstation configuration.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the workstation resources.
 * @param {string} locationId - The Google Cloud region hosting the workstation cluster.
 * @param {string} workstationClusterId - The ID of the workstation cluster. This is caller-chosen upon cluster creation.
 * @param {string} workstationConfigId - The ID of the workstation configuration. This is caller-chosen upon configuration creation.
 */
async function listWorkstations(projectId, locationId, workstationClusterId, workstationConfigId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}/workstationConfigs/${workstationConfigId}`;

    const [workstations] = await client.listWorkstations({
      parent,
    });

    for (const workstation of workstations) {
      console.log(`Workstation: ${workstation.name}`);
      console.log(`State: ${workstation.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`gRPC error with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listWorkstations };
// [END workstations_v1beta_workstations_workstations_list]
