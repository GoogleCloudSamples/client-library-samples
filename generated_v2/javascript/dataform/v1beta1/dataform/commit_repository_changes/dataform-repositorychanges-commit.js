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

// [START dataform_v1beta1_dataform_commit_repository_changes]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the commitRepositoryChanges method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository.
 */
async function commitRepositoryChanges(projectId, locationId, repositoryId) {
  try {
    const commitMetadata = {
      author: {
        name: 'Sample Author',
        emailAddress: 'sample-author@example.com',
      },
      commitMessage: 'Commit changes via API',
    };
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const fileOperations = {
      'definitions/sample.sqlx': {
        writeFile: {
          contents: Buffer.from('SELECT 1 AS sample_column'),
        },
      },
    };

    const request = {
      name,
      commitMetadata,
      fileOperations,
    };

    await client.commitRepositoryChanges(request);
    console.log(`Successfully committed changes to repository: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { commitRepositoryChanges };
// [END dataform_v1beta1_dataform_commit_repository_changes]
