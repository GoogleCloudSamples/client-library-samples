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

// [START datastore_v1_datastore_reserve_ids]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Use the reserveIds method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function reserveIds(projectId) {
  try {
    // Reserve numeric IDs to prevent Datastore auto-allocation from generating them.
    const keys = [
      {
        partitionId: {
          projectId,
        },
        path: [
          {
            kind: 'Task',
            id: 1001,
          },
        ],
      },
    ];

    const request = {
      projectId,
      keys,
    };

    const [response] = await client.reserveIds(request);
    console.log(`Successfully reserved IDs for ${keys.length} key(s) in project ${projectId}.`);
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.details || err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.details || err.message);
    } else {
      console.error(`API error (${err.code}):`, err.details || err.message);
    }
  }
}

module.exports = { reserveIds };
// [END datastore_v1_datastore_reserve_ids]
