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

// [START workstations_v1beta_workstations_workstation_create]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Use the createWorkstation method
 *
 * @param {string} workstationId - The ID to use for the workstation, which becomes the final component of the workstation's resource name.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the workstation cluster is located (e.g., 'us-central1').
 * @param {string} workstationClusterId - The ID of the existing workstation cluster.
 * @param {string} workstationConfigId - The ID of the existing workstation configuration.
 */
async function createWorkstation(workstationId, projectId, locationId, workstationClusterId, workstationConfigId) {
  try {
    const parent = client.workstationConfigPath(
      projectId,
      locationId,
      workstationClusterId,
      workstationConfigId
    );
    const workstation = {
      displayName: 'Example Workstation',
    };

    const request = {
      parent,
      workstationId,
      workstation,
    };

    // CreateWorkstation returns a long-running operation
    const [operation] = await client.createWorkstation(request);
    const [response] = await operation.promise();

    console.log(`Created workstation: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workstation already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else {
      console.error(`Failed to create workstation: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createWorkstation };
// [END workstations_v1beta_workstations_workstation_create]
