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

// [START dataform_v1beta1_dataform_query_repository_directory_contents]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Queries directory contents in a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the Dataform repository (for example, us-central1).
 * @param {string} repositoryId - The ID of the Dataform repository to query directory contents from.
 */
async function queryRepositoryDirectoryContents(projectId, locationId, repositoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      name,
    };

    const [entries] = await client.queryRepositoryDirectoryContents(request);

    console.log(`Retrieved ${entries.length} items from ${name}:`);
    for (const entry of entries) {
      if (entry.file) {
        console.log(`File: ${entry.file}`);
      } else if (entry.directory) {
        console.log(`Directory: ${entry.directory}`);
      }
    }

    return entries;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing repository: ${err.message}`);
    } else {
      console.error(`RPC failed with error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { queryRepositoryDirectoryContents };
// [END dataform_v1beta1_dataform_query_repository_directory_contents]
