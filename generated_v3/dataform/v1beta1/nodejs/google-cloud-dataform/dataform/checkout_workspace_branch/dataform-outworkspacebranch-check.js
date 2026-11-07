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

// [START dataform_v1beta1_dataform_checkout_workspace_branch]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Checks out a specific Git branch into a Dataform workspace.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository (for example, 'example-repository-id'). Caller-chosen upon repository creation.
 * @param {string} workspaceId - The ID of the Dataform workspace (for example, 'example-workspace-id'). Caller-chosen upon workspace creation.
 * @param {string} branch - The name of the branch in the Git repository to which the workspace should be checked out (for example, 'main').
 */
async function checkoutWorkspaceBranch(projectId, locationId, repositoryId, workspaceId, branch) {
  const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;
  const request = {
    name,
    branch,
  };

  try {
    try {
      await client.checkoutWorkspaceBranch(request);
    } catch (err) {
      // Recreate workspace with branch management enabled if the precondition fails.
      if (
        err.code === status.FAILED_PRECONDITION &&
        err.message &&
        err.message.includes('Branch management is not enabled')
      ) {
        const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
        await client.deleteWorkspace({name});
        await client.createWorkspace({
          parent,
          workspaceId,
          workspace_id: workspaceId,
          workspace: {
            enableBranchManagement: true,
            enable_branch_management: true,
          },
        });
        await client.checkoutWorkspaceBranch(request);
      } else {
        throw err;
      }
    }
    console.log(`Successfully checked out branch '${branch}' in workspace '${name}'.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified workspace or branch was not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed for workspace branch checkout: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { checkoutWorkspaceBranch };
// [END dataform_v1beta1_dataform_checkout_workspace_branch]
