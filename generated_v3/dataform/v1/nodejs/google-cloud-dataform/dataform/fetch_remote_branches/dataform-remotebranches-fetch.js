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

// [START dataform_v1_dataform_fetch_remote_branches]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the fetchRemoteBranches method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the Dataform repository (e.g., 'us-central1').
 * @param {string} repositoryId - The caller-specified ID of the Dataform repository.
 */
async function fetchRemoteBranches(projectId, locationId, repositoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      name,
    };

    const [response] = await client.fetchRemoteBranches(request);

    console.log(`Fetched remote branches for ${name}:`);
    if (response.branches && response.branches.length > 0) {
      for (const branch of response.branches) {
        console.log(`- ${branch}`);
      }
    } else {
      console.log('No remote branches found.');
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for repository: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failed precondition for Git remote: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { fetchRemoteBranches };
// [END dataform_v1_dataform_fetch_remote_branches]
