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

// [START firestore_v1beta1_firestore_write]
'use strict';

const firestore = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const FirestoreClient =
  (firestore.v1beta1 && firestore.v1beta1.FirestoreClient) ||
  (firestore.v1 && firestore.v1.FirestoreClient) ||
  firestore.FirestoreClient;

const client = new FirestoreClient();

/**
 * Streams write operations to Firestore using the Write RPC method.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} databaseId - The Firestore database ID, typically '(default)'.
 */
async function write(projectId, databaseId) {
  try {
    let effectiveProjectId = projectId;
    let effectiveDatabaseId = databaseId;
    if (projectId === '(default)' || (typeof projectId === 'string' && projectId.startsWith('('))) {
      effectiveProjectId = databaseId;
      effectiveDatabaseId = projectId;
    }

    const database = `projects/${effectiveProjectId}/databases/${effectiveDatabaseId}`;

    const documentData = {
      stringValue: 'example-value',
    };
    const documentFields = {
      exampleField: documentData,
    };
    const documentMutation = {
      name: `${database}/documents/example-collection/example-document`,
      fields: documentFields,
    };
    const writes = [
      {
        update: documentMutation,
      },
    ];

    await new Promise((resolve, reject) => {
      const stream = client.write();

      stream.on('data', response => {
        if (response.streamId) {
          console.log(`Stream established with ID: ${response.streamId}`);
          // Send document mutations after the stream handshake completes
          stream.write({
            writes: writes,
          });
          stream.end();
        }

        if (response.writeResults && response.writeResults.length > 0) {
          console.log(`Write results count: ${response.writeResults.length}`);
          for (const result of response.writeResults) {
            console.log(`Document updated at seconds: ${result.updateTime ? result.updateTime.seconds : 'unknown'}`);
          }
        }
      });

      stream.on('error', err => {
        reject(err);
      });

      stream.on('end', () => {
        resolve();
      });

      // Send the initial request containing the database to initiate the stream
      stream.write({
        database: database,
      });
    });
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.details}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.details}`);
    } else if (err.code && Object.values(status).includes(err.code)) {
      console.error(`gRPC error [Code ${err.code}]: ${err.details || err.message}`);
    } else {
      console.error(`Encountered error during write stream: ${err.message}`);
    }
  }
}

module.exports = { write };
// [END firestore_v1beta1_firestore_write]
