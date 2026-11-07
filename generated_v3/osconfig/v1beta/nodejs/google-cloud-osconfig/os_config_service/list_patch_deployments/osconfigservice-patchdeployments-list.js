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

// [START osconfig_v1beta_osconfigservice_patchdeployments_list]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Lists patch deployments in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listPatchDeployments(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [deployments] = await client.listPatchDeployments(request);

    for (const deployment of deployments) {
      console.log(`Patch deployment name: ${deployment.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`Failed to list patch deployments: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listPatchDeployments };
// [END osconfig_v1beta_osconfigservice_patchdeployments_list]
