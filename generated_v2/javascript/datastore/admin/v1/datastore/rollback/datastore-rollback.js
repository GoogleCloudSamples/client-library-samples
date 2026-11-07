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

// [START datastore_v1_datastore_rollback]
'use strict';

const {DatastoreClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreClient();

/**
 * Use the rollback method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function rollback(projectId) {
  try {
    // Acquire a transaction to roll back.
    const [beginTransactionResponse] = await client.beginTransaction({
      projectId,
    });
    const transaction = beginTransactionResponse.transaction;

    const request = {
      projectId,
      transaction,
    };

    const [response] = await client.rollback(request);
    console.log('Transaction rolled back successfully.');
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Transaction not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { rollback };
// [END datastore_v1_datastore_rollback]
