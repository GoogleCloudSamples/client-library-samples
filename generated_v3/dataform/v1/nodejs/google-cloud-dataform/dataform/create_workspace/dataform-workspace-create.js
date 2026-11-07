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

// [START dataform_v1_dataform_workspace_create]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Creates a Dataform workspace in a repository.
 *
 * @param {string} projectId - The Google Cloud project ID where the Dataform repository is hosted.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is hosted (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository in which to create the workspace.
 * @param {string} workspaceId - The caller-chosen ID to assign to the new workspace.
 */
async function createWorkspace(projectId, locationId, repositoryId, workspaceId) {
  try {
    const workspace = {};
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const [response] = await client.createWorkspace({
      parent,
      workspace,
      workspaceId,
    });

    console.log(`Created workspace: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workspace already exists: ${workspaceId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${repositoryId}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
    throw err;
  }
}

module.exports = { createWorkspace };
// [END dataform_v1_dataform_workspace_create]
