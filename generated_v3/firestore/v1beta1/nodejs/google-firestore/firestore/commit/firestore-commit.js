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

// [START firestore_v1beta1_firestore_commit]
'use strict';

const {v1, v1beta1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const firestore = v1beta1 || v1;
const client = new firestore.FirestoreClient();

/**
 * Commits a write operation to a Firestore database.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} databaseId - ID of the database (for example, 'example-database-id')
 */
async function commit(projectId, databaseId) {
  try {
    // Construct the database resource identifier.
    const database = `projects/${projectId}/databases/${databaseId}`;
    const documentName = `${database}/documents/cities/SF`;

    const fields = {
      name: {stringValue: 'San Francisco'},
    };

    const document = {
      name: documentName,
      fields,
    };

    const write = {
      update: document,
    };

    const request = {
      database,
      writes: [write],
    };

    const [response] = await client.commit(request);
    console.log(`Commit write results count: ${response.writeResults.length}`);
    if (response.commitTime) {
      console.log(`Commit completed at seconds: ${response.commitTime.seconds}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Commit failed: ${err.message}`);
    }
  }
}

module.exports = {commit};
// [END firestore_v1beta1_firestore_commit]
