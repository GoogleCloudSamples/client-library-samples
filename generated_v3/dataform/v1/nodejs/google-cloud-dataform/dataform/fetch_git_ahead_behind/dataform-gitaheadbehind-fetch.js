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

// [START dataform_v1_dataform_fetch_git_ahead_behind]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Fetches ahead and behind commit counts for a Dataform workspace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for Dataform (for example, 'us-central1').
 * @param {string} repositoryId - The caller-chosen ID of the Dataform repository.
 * @param {string} workspaceId - The caller-chosen ID of the Dataform workspace.
 */
async function fetchGitAheadBehind(projectId, locationId, repositoryId, workspaceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

    const request = {
      name,
    };

    const [response] = await client.fetchGitAheadBehind(request);

    console.log(`Workspace: ${name}`);
    console.log(`Commits ahead: ${response.commitsAhead}`);
    console.log(`Commits behind: ${response.commitsBehind}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to fetch Git status: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { fetchGitAheadBehind };
// [END dataform_v1_dataform_fetch_git_ahead_behind]
