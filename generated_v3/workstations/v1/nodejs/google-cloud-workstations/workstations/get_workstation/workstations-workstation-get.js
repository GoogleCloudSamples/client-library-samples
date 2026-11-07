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

// [START workstations_v1_workstations_workstation_get]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Retrieves details for an existing workstation.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the workstation cluster is located.
 * @param {string} workstationClusterId - The ID of the parent workstation cluster.
 * @param {string} workstationConfigId - The ID of the parent workstation configuration.
 * @param {string} workstationId - The ID of the workstation to retrieve.
 */
async function getWorkstation(projectId, locationId, workstationClusterId, workstationConfigId, workstationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}/workstationConfigs/${workstationConfigId}/workstations/${workstationId}`;

    const request = {
      name,
    };

    const [workstation] = await client.getWorkstation(request);

    console.log(`Retrieved workstation: ${workstation.name}`);
    console.log(`Workstation state: ${workstation.state}`);
    console.log(`Workstation host: ${workstation.host}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workstation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving workstation: ${err.message}`);
    } else {
      console.error(`API error retrieving workstation: ${err.message}`);
    }
  }
}

module.exports = { getWorkstation };
// [END workstations_v1_workstations_workstation_get]
