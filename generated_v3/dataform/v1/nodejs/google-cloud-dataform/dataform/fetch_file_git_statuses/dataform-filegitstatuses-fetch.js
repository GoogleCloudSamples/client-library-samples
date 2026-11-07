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

// [START dataform_v1_dataform_fetch_file_git_statuses]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Fetches Git statuses of files in a Dataform workspace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dataform region or location ID (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository.
 * @param {string} workspaceId - The ID of the Dataform workspace.
 */
async function fetchFileGitStatuses(projectId, locationId, repositoryId, workspaceId) {
  const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

  try {
    const [response] = await client.fetchFileGitStatuses({name});

    console.log(`Fetched Git status for workspace: ${name}`);
    if (response.uncommittedFileChanges && response.uncommittedFileChanges.length > 0) {
      for (const change of response.uncommittedFileChanges) {
        console.log(`File: ${change.path}, Status: ${change.state}`);
      }
    } else {
      console.log('No uncommitted changes detected.');
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing workspace: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to fetch file Git statuses: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {fetchFileGitStatuses};
// [END dataform_v1_dataform_fetch_file_git_statuses]
