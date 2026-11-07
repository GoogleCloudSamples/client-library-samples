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

// [START workstations_v1beta_workstations_generate_access_token]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Use the generateAccessToken method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the workstation cluster is located.
 * @param {string} workstationClusterId - The caller-specified ID of the workstation cluster.
 * @param {string} workstationConfigId - The caller-specified ID of the workstation configuration.
 * @param {string} workstationId - The caller-specified ID of the workstation.
 */
async function generateAccessToken(projectId, locationId, workstationClusterId, workstationConfigId, workstationId) {
  try {
    const workstation = `projects/${projectId}/locations/${locationId}/workstationClusters/${workstationClusterId}/workstationConfigs/${workstationConfigId}/workstations/${workstationId}`;

    const request = {
      workstation,
    };

    const [response] = await client.generateAccessToken(request);

    console.log(`Generated access token: ${response.accessToken}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Workstation not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Failed to generate access token:', err.message);
    }
  }
}

module.exports = { generateAccessToken };
// [END workstations_v1beta_workstations_generate_access_token]
