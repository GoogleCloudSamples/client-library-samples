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

// [START workstations_v1beta_workstations_workstationconfig_update]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Use the updateWorkstationConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the workstation cluster is located.
 * @param {string} workstationClusterId - The ID of the parent workstation cluster.
 * @param {string} workstationConfigId - The ID of the workstation configuration to update.
 */
async function updateWorkstationConfig(projectId, locationId, workstationClusterId, workstationConfigId) {
  try {
    const workstationConfig = {
      name: client.workstationConfigPath(
        projectId,
        locationId,
        workstationClusterId,
        workstationConfigId
      ),
      displayName: 'Updated Workstation Config',
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateWorkstationConfig({
      workstationConfig,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated workstation configuration: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workstation configuration not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workstation configuration conflict: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`RPC failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateWorkstationConfig };
// [END workstations_v1beta_workstations_workstationconfig_update]
