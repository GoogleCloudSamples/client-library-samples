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

// [START osconfig_v1beta_osconfigservice_patchdeployment_delete]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Use the deletePatchDeployment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} patchDeploymentId - The caller-chosen identifier of the patch deployment to delete (for example, 'example-patch-deployment').
 */
async function deletePatchDeployment(projectId, patchDeploymentId) {
  try {
    const name = `projects/${projectId}/patchDeployments/${patchDeploymentId}`;
    const request = {
      name,
    };

    await client.deletePatchDeployment(request);
    console.log(`Deleted patch deployment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Patch deployment not found.');
    } else {
      console.error(`Failed to delete patch deployment: ${err.message}`);
    }
  }
}

module.exports = { deletePatchDeployment };
// [END osconfig_v1beta_osconfigservice_patchdeployment_delete]
