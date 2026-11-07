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

// [START dataform_v1beta1_dataform_workspaces_list]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the listWorkspaces method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} repositoryId - ID of the Repository (for example, 'example-repository-id')
 */
async function listWorkspaces(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const [workspaces] = await client.listWorkspaces({parent});

    console.log(`Retrieved ${workspaces.length} workspace(s):`);
    for (const workspace of workspaces) {
      console.log(`Workspace name: ${workspace.name}`);
    }

    return workspaces;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing repository: ${err.message}`);
    } else {
      console.error(`Failed to list workspaces: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listWorkspaces };
// [END dataform_v1beta1_dataform_workspaces_list]
