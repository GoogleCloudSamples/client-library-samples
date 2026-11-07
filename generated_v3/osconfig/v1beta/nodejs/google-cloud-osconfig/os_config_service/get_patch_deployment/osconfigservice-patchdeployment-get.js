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

// [START osconfig_v1beta_osconfigservice_patchdeployment_get]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Retrieves an existing patch deployment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} patchDeploymentId - The identifier of the patch deployment (for example, 'example-patch-deployment'). Must be 1-63 characters, start with a letter, end with a letter or digit, and contain only lowercase letters, digits, and hyphens.
 */
async function getPatchDeployment(projectId, patchDeploymentId) {
  try {
    const name = `projects/${projectId}/patchDeployments/${patchDeploymentId}`;
    const request = {
      name,
    };

    const [response] = await client.getPatchDeployment(request);

    console.log(`Retrieved patch deployment: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch deployment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing patch deployment: ${err.message}`);
    } else {
      console.error(`Failed to retrieve patch deployment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPatchDeployment };
// [END osconfig_v1beta_osconfigservice_patchdeployment_get]
