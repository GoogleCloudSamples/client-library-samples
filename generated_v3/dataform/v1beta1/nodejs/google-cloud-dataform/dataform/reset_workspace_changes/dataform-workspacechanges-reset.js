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

// [START dataform_v1beta1_dataform_reset_workspace_changes]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the resetWorkspaceChanges method
 *
 * @param {string} projectId - The ID of the Google Cloud project.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository containing the workspace.
 * @param {string} workspaceId - The ID of the Dataform workspace in which changes will be reset.
 */
async function resetWorkspaceChanges(projectId, locationId, repositoryId, workspaceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;
    const request = {
      name,
    };

    await client.resetWorkspaceChanges(request);
    console.log(`Reset uncommitted changes in workspace: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Workspace in invalid state to reset changes: ${err.message}`);
    } else {
      console.error(`Failed to reset workspace changes: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { resetWorkspaceChanges };
// [END dataform_v1beta1_dataform_reset_workspace_changes]
