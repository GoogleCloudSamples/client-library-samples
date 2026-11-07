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

// [START firestore_v1_firestore_rollback]
'use strict';

const {v1} = require('@google-cloud/firestore');
const {status} = require('@grpc/grpc-js');

const client = new v1.FirestoreClient();

/**
 * Rolls back a transaction in Firestore.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} databaseId - ID of the database (for example, 'example-database-id')
 */
async function rollback(projectId, databaseId) {
  try {
    // Construct the database resource identifier
    const database = `projects/${projectId}/databases/${databaseId}`;

    // Start a transaction to obtain a valid transaction handle
    const [beginTransactionResponse] = await client.beginTransaction({
      database,
    });
    const transaction = beginTransactionResponse.transaction;

    // Roll back the active transaction
    await client.rollback({
      database,
      transaction,
    });

    console.log('Transaction successfully rolled back.');
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified database or transaction not found:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Transaction state invalid for rollback:', err.message);
    } else {
      console.error('Failed to rollback transaction:', err.message);
    }
  }
}

module.exports = { rollback };
// [END firestore_v1_firestore_rollback]
