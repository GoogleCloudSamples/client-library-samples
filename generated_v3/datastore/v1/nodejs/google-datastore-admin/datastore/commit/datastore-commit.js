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

// [START datastore_v1_datastore_commit]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Commits a mutation to Datastore.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function commit(projectId) {
  try {
    const request = {
      projectId: projectId,
      mode: 'NON_TRANSACTIONAL',
      mutations: [
        {
          insert: {
            key: {
              partitionId: {
                projectId: projectId,
              },
              path: [
                {
                  kind: 'Task',
                  name: 'task1',
                },
              ],
            },
            properties: {
              description: {
                stringValue: 'Task description',
              },
            },
          },
        },
      ],
    };

    const [response] = await client.commit(request);
    console.log(`Commit successful. Mutation results count: ${response.mutationResults.length}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error('Entity already exists:', err.message);
    } else {
      console.error('Error during commit:', err.message || err);
    }
  }
}

module.exports = { commit };
// [END datastore_v1_datastore_commit]
