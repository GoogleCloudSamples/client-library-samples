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

// [START dataform_v1beta1_dataform_workspace_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Retrieves a Dataform workspace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Dataform repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository containing the workspace.
 * @param {string} workspaceId - The ID of the Dataform workspace to retrieve.
 */
async function getWorkspace(projectId, locationId, repositoryId, workspaceId) {
  try {
    // Construct the workspace resource name.
    const name = client.workspacePath(
      projectId,
      locationId,
      repositoryId,
      workspaceId
    );

    const [workspace] = await client.getWorkspace({name});
    console.log(`Retrieved workspace: ${workspace.name}`);
    return workspace;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve workspace: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getWorkspace };
// [END dataform_v1beta1_dataform_workspace_get]
