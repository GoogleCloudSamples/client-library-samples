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

// [START firestore_v1beta1_firestore_batch_get_documents]
'use strict';

const {v1beta1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.FirestoreClient();

/**
 * Retrieves multiple documents in a batch request.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} databaseId - ID of the database (for example, 'example-database-id')
 */
async function batchGetDocuments(projectId, databaseId) {
  try {
    const database = `projects/${projectId}/databases/${databaseId}`;
    const request = {
      database,
      documents: [
        `${database}/documents/cities/SF`,
        `${database}/documents/cities/LA`,
      ],
    };

    const stream = client.batchGetDocuments(request);
    for await (const response of stream) {
      if (response.found) {
        console.log(`Found document: ${response.found.name}`);
      } else if (response.missing) {
        console.log(`Missing document: ${response.missing}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Firestore API error [code ${err.code}]:`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = {batchGetDocuments};
// [END firestore_v1beta1_firestore_batch_get_documents]
