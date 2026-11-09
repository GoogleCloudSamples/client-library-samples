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

// [START dataform_v1beta1_dataform_install_npm_packages]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the installNpmPackages method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region location where the Dataform repository is hosted.
 * @param {string} repositoryId - The ID of the Dataform repository.
 * @param {string} workspaceId - The ID of the Dataform workspace.
 */
async function installNpmPackages(projectId, locationId, repositoryId, workspaceId) {
  try {
    const workspace = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

    const request = {
      workspace,
    };

    const [response] = await client.installNpmPackages(request);
    console.log(`Installed npm packages for workspace: ${workspace}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failed precondition: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to install npm packages: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { installNpmPackages };
// [END dataform_v1beta1_dataform_install_npm_packages]
