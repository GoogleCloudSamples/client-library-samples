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

// [START osconfig_v1_osconfigservice_patchdeployment_get]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Retrieves information about an OS Config patch deployment.
 *
 * @param {string} project_id - The Google Cloud project ID.
 * @param {string} patch_deployment_id - The ID of the patch deployment.
 */
async function getPatchDeployment(project_id, patch_deployment_id) {
  // Construct the fully qualified resource name for the patch deployment.
  const name = client.patchDeploymentPath(project_id, patch_deployment_id);

  try {
    const request = {
      name,
    };

    const [response] = await client.getPatchDeployment(request);

    console.log(`Patch deployment: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch deployment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error retrieving patch deployment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPatchDeployment };
// [END osconfig_v1_osconfigservice_patchdeployment_get]
