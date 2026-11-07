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

// [START datastore_v1_datastore_allocate_ids]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Allocates IDs for incomplete keys in Cloud Datastore.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function allocateIds(projectId) {
  try {
    // Incomplete key definitions for which unique IDs are allocated
    const keys = [
      {
        partitionId: {
          projectId,
        },
        path: [
          {
            kind: 'Task',
          },
        ],
      },
    ];

    const request = {
      projectId,
      keys,
    };

    const [response] = await client.allocateIds(request);
    console.log('Allocated keys:');
    for (const key of response.keys) {
      const pathElement = key.path[key.path.length - 1];
      console.log(`Kind: ${pathElement.kind}, ID: ${pathElement.id}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}):`, err.message);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { allocateIds };
// [END datastore_v1_datastore_allocate_ids]
