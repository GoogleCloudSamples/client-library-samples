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

// [START dataform_v1beta1_dataform_fetch_remote_branches]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Fetches remote Git branches configured for a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Dataform repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository.
 */
async function fetchRemoteBranches(projectId, locationId, repositoryId) {
  // Construct the repository resource identifier.
  const name = client.repositoryPath(projectId, locationId, repositoryId);

  try {
    const request = {
      name,
    };

    const [response] = await client.fetchRemoteBranches(request);

    console.log(`Fetched remote branches for repository ${repositoryId}:`);
    if (response.branches && response.branches.length > 0) {
      for (const branch of response.branches) {
        console.log(`- ${branch}`);
      }
    } else {
      console.log('No remote branches found.');
    }

    return response.branches;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at ${name}:`, err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing ${name}:`, err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failure:', err.message);
    } else {
      console.error(`API operation failed with code ${err.code}:`, err.message);
    }
    throw err;
  }
}

module.exports = { fetchRemoteBranches };
// [END dataform_v1beta1_dataform_fetch_remote_branches]
