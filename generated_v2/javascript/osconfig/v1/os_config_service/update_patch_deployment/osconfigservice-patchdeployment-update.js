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

// [START osconfig_v1_osconfigservice_patchdeployment_update]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Updates an OS patch deployment description.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} patchDeploymentId - The ID of the patch deployment to update.
 */
async function updatePatchDeployment(projectId, patchDeploymentId) {
  try {
    const name = `projects/${projectId}/patchDeployments/${patchDeploymentId}`;

    // Retrieve the existing patch deployment to supply server-required fields.
    const [patchDeployment] = await client.getPatchDeployment({name});
    patchDeployment.description = 'Updated patch deployment description';

    const updateMask = {
      paths: ['description'],
    };

    const request = {
      patchDeployment,
      updateMask,
    };

    const [response] = await client.updatePatchDeployment(request);
    console.log(`Updated patch deployment: ${response.name}`);
    console.log(`Updated description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch deployment not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error with status code ${err.code}: ${err.message}`);
    } else {
      console.error('Non-API error encountered:', err);
    }
    throw err;
  }
}

module.exports = {updatePatchDeployment};
// [END osconfig_v1_osconfigservice_patchdeployment_update]
