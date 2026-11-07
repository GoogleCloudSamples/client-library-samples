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

// [START dataform_v1_dataform_fetch_repository_history]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Fetches the commit history for a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, "us-central1").
 * @param {string} repositoryId - The ID of the Dataform repository.
 */
async function fetchRepositoryHistory(projectId, locationId, repositoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      name,
    };

    const [commits] = await client.fetchRepositoryHistory(request);

    console.log(`Fetched repository history for: ${name}`);
    console.log(`Found ${commits.length} commit(s).`);
    for (const commit of commits) {
      console.log(`Commit SHA: ${commit.commitSha}`);
      console.log(`Commit message: ${commit.commitMessage}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The specified repository was not found.');
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Repository history precondition failed: ${err.message}`);
    } else {
      console.error(`Error fetching repository history: ${err.message}`);
    }
  }
}

module.exports = { fetchRepositoryHistory };
// [END dataform_v1_dataform_fetch_repository_history]
