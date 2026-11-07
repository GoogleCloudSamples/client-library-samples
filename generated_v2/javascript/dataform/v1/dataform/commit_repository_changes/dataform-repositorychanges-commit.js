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

// [START dataform_v1_dataform_commit_repository_changes]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Commits changes directly to an existing Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository resides (for example, 'us-central1').
 * @param {string} repositoryId - The caller-specified ID of the existing Dataform repository. The repository must not have git_remote_settings.url set.
 */
async function commitRepositoryChanges(projectId, locationId, repositoryId) {
  try {
    const name = client.repositoryPath(projectId, locationId, repositoryId);
    const commitMetadata = {
      author: {
        name: 'Example Author',
        emailAddress: 'example-author@example.com',
      },
      commitMessage: 'Add sample table definition',
    };
    const fileOperations = {
      'definitions/quickstart.sqlx': {
        writeFile: {
          contents: Buffer.from(
            'config { type: "table" }\nSELECT 1 AS sample_column'
          ),
        },
      },
    };

    const request = {
      name,
      commitMetadata,
      fileOperations,
    };

    await client.commitRepositoryChanges(request);
    console.log(`Committed changes to repository: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { commitRepositoryChanges };
// [END dataform_v1_dataform_commit_repository_changes]
