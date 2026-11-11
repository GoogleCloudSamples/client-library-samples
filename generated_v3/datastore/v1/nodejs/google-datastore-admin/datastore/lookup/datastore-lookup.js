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

// [START datastore_v1_datastore_lookup]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Use the lookup method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function lookup(projectId) {
  try {
    const keys = [
      {
        path: [
          {
            kind: 'Task',
            name: 'example-task',
          },
        ],
      },
    ];

    const request = {
      projectId,
      keys,
    };

    const [response] = await client.lookup(request);

    if (response.found && response.found.length > 0) {
      for (const result of response.found) {
        console.log(`Found entity: ${JSON.stringify(result.entity)}`);
      }
    }

    if (response.missing && response.missing.length > 0) {
      for (const result of response.missing) {
        console.log(`Missing entity key: ${JSON.stringify(result.entity.key)}`);
      }
    }

    if (response.deferred && response.deferred.length > 0) {
      console.log(`Deferred keys count: ${response.deferred.length}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entities not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Datastore lookup failed: ${err.message}`);
    }
  }
}

module.exports = { lookup };
// [END datastore_v1_datastore_lookup]
