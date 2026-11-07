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

// [START dataform_v1beta1_dataform_query_directory_contents]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Queries the directory contents of a Dataform workspace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The Dataform repository identifier.
 * @param {string} workspaceId - The Dataform workspace identifier.
 */
async function queryDirectoryContents(projectId, locationId, repositoryId, workspaceId) {
  try {
    const workspace = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;

    const request = {
      workspace,
    };

    const [entries] = await client.queryDirectoryContents(request);

    console.log(`Directory contents for workspace: ${workspace}`);
    for (const entry of entries) {
      if (entry.file) {
        console.log(`File: ${entry.file}`);
      } else if (entry.directory) {
        console.log(`Directory: ${entry.directory}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { queryDirectoryContents };
// [END dataform_v1beta1_dataform_query_directory_contents]
