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

// [START osconfig_v1_osconfigservice_patchdeployments_list]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Lists patch deployments in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listPatchDeployments(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [deployments] = await client.listPatchDeployments(request);

    console.log(`Retrieved patch deployments for ${parent}:`);
    for (const deployment of deployments) {
      console.log(`- Name: ${deployment.name}`);
      console.log(`  Description: ${deployment.description || 'None'}`);
      console.log(`  Target sync state: ${deployment.targetState || 'STATE_UNSPECIFIED'}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing project: ${projectId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${projectId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for parent: projects/${projectId}`);
    } else {
      console.error(`Error listing patch deployments: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listPatchDeployments };
// [END osconfig_v1_osconfigservice_patchdeployments_list]
