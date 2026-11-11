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

// [START datastore_v1_datastore_run_query]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Use the runQuery method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function runQuery(projectId) {
  try {
    // Construct the query targeting entities of kind 'Task' and limit the results.
    const query = {
      kind: [{name: 'Task'}],
      limit: {value: 10},
    };

    const request = {
      projectId,
      query,
    };

    const [response] = await client.runQuery(request);

    const results = response.batch?.entityResults ?? [];
    console.log(`Entities retrieved: ${results.length}`);
    for (const result of results) {
      console.log(`Entity key: ${JSON.stringify(result.entity?.key)}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid query argument:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for Datastore request:', err.message);
    } else {
      console.error('Datastore runQuery encountered an error:', err.message);
    }
  }
}

module.exports = { runQuery };
// [END datastore_v1_datastore_run_query]
