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

// [START dataform_v1beta1_dataform_workspace_create]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the createWorkspace method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the existing Dataform repository in which to create the workspace.
 * @param {string} workspaceId - The caller-chosen ID to use for the workspace (for example, 'example-workspace').
 */
async function createWorkspace(projectId, locationId, repositoryId, workspaceId) {
  try {
    // Construct the parent repository resource path
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    // An empty object initializes a Workspace message with default settings
    const workspace = {};

    const [createdWorkspace] = await client.createWorkspace({
      parent,
      workspace,
      workspaceId,
    });

    console.log(`Created workspace: ${createdWorkspace.name}`);
    return createdWorkspace;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workspace already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createWorkspace };
// [END dataform_v1beta1_dataform_workspace_create]
