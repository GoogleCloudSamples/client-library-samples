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

// [START dataform_v1beta1_dataform_make_directory]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the makeDirectory method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located.
 * @param {string} repositoryId - The ID of the Dataform repository containing the workspace.
 * @param {string} workspaceId - The ID of the Dataform workspace in which to create the directory.
 */
async function makeDirectory(projectId, locationId, repositoryId, workspaceId) {
  try {
    const path = 'definitions/example_directory';
    const workspace = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

    const request = {
      workspace,
      path,
    };

    const [response] = await client.makeDirectory(request);
    console.log(`Created directory at path: ${path}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Directory already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else {
      console.error(`MakeDirectory request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { makeDirectory };
// [END dataform_v1beta1_dataform_make_directory]
