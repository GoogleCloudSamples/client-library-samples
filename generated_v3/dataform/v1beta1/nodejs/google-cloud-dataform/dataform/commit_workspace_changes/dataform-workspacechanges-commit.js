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

// [START dataform_v1beta1_dataform_commit_workspace_changes]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the commitWorkspaceChanges method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (e.g., 'us-central1').
 * @param {string} repositoryId - The caller-chosen ID of the Dataform repository.
 * @param {string} workspaceId - The caller-chosen ID of the Dataform workspace containing uncommitted changes.
 */
async function commitWorkspaceChanges(projectId, locationId, repositoryId, workspaceId) {
  try {
    const author = {
      name: 'Sample Committer',
      emailAddress: 'committer@example.com',
    };
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

    const request = {
      name,
      author,
      commitMessage: 'Commit workspace changes',
    };

    await client.commitWorkspaceChanges(request);
    console.log(`Committed changes to workspace: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Error committing workspace changes: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { commitWorkspaceChanges };
// [END dataform_v1beta1_dataform_commit_workspace_changes]
