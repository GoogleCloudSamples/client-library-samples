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

// [START osconfig_v1beta_osconfigservice_pause_patch_deployment]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Pauses an active patch deployment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} patchDeploymentId - The ID of the patch deployment to pause (for example, 'example-patch-deployment').
 */
async function pausePatchDeployment(projectId, patchDeploymentId) {
  try {
    const name = `projects/${projectId}/patchDeployments/${patchDeploymentId}`;
    const request = {
      name,
    };

    const [response] = await client.pausePatchDeployment(request);
    console.log(`Patch deployment paused: ${response.name}`);
    console.log(`Current state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch deployment not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot pause patch deployment: ${err.message}`);
    } else {
      console.error(`Failed to pause patch deployment: ${err.message}`);
    }
  }
}

module.exports = { pausePatchDeployment };
// [END osconfig_v1beta_osconfigservice_pause_patch_deployment]
