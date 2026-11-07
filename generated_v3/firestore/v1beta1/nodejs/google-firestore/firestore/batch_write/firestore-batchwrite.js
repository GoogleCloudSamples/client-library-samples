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

// [START firestore_v1beta1_firestore_batch_write]
'use strict';

const {v1beta1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.FirestoreClient();

/**
 * Use the batchWrite method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} databaseId - ID of the Database (for example, 'example-database-id')
 */
async function batchWrite(projectId, databaseId) {
  try {
    const database = `projects/${projectId}/databases/${databaseId}`;
    const request = {
      database,
      writes: [
        {
          update: {
            name: `${database}/documents/example-collection/example-document`,
            fields: {
              title: {stringValue: 'Batch Write Title'},
              status: {stringValue: 'active'},
            },
          },
        },
      ],
    };

    const [response] = await client.batchWrite(request);
    console.log('Batch write completed successfully.');
    if (response.writeResults) {
      console.log(`Committed ${response.writeResults.length} write operations.`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Database or resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else {
      console.error('Firestore API error during batch write:', err.message || err);
    }
  }
}

module.exports = { batchWrite };
// [END firestore_v1beta1_firestore_batch_write]
