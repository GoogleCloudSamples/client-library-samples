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

// [START osconfig_v1_osconfigservice_patchdeployment_create]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Use the createPatchDeployment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} patchDeploymentId - ID of the PatchDeployment (for example, 'example-patchdeployment-id')
 */
async function createPatchDeployment(projectId, patchDeploymentId) {
  try {
    const parent = `projects/${projectId}`;
    const patchDeployment = {
      instanceFilter: {
        all: true,
      },
      oneTimeSchedule: {
        executeTime: {
          seconds: Math.floor(Date.now() / 1000) + 3600,
        },
      },
    };

    const request = {
      parent,
      patchDeploymentId,
      patchDeployment,
    };

    const [response] = await client.createPatchDeployment(request);
    console.log(`Created patch deployment: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Patch deployment ${patchDeploymentId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for patch deployment creation.');
    } else {
      console.error('Failed to create patch deployment:', err);
    }
  }
}

module.exports = { createPatchDeployment };
// [END osconfig_v1_osconfigservice_patchdeployment_create]
