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

// [START osconfig_v1beta_osconfigservice_patchdeployment_create]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Creates a patch deployment in Google Cloud OS Config.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} patchDeploymentId - The ID of the patch deployment (for example, 'example-patchdeployment-id').
 */
async function createPatchDeployment(projectId, patchDeploymentId) {
  try {
    const parent = `projects/${projectId}`;
    const patchDeployment = {
      instanceFilter: {
        all: true,
      },
      patchConfig: {
        rebootConfig: 'ALWAYS',
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
    console.log(`Patch deployment created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Patch deployment ${patchDeploymentId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for patch deployment creation: ${err.message}`);
    } else {
      console.error(`Failed to create patch deployment: ${err.message}`);
    }
  }
}

module.exports = { createPatchDeployment };
// [END osconfig_v1beta_osconfigservice_patchdeployment_create]
