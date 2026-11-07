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

// [START spanner_v1_spanner_rollback]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the rollback method
 *
 * @param {string} transactionId - The server-generated transaction ID bytes of the transaction to roll back, obtained from BeginTransaction.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Cloud Spanner instance.
 * @param {string} databaseId - The ID of the Cloud Spanner database.
 * @param {string} sessionId - The server-assigned ID of the Cloud Spanner session.
 */
async function rollback(transactionId, projectId, instanceId, databaseId, sessionId) {
  try {
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const request = {
      session,
      transactionId,
    };

    await client.rollback(request);
    console.log(`Rolled back transaction in session: ${session}`);
  } catch (err) {
    if (err.code !== undefined) {
      if (err.code === status.NOT_FOUND) {
        console.error(`Session or transaction not found: ${err.message}`);
      } else if (err.code === status.FAILED_PRECONDITION) {
        console.error(`Transaction state is invalid for rollback: ${err.message}`);
      } else {
        console.error(`Google API error code ${err.code}: ${err.message}`);
      }
      return;
    }
    throw err;
  }
}

module.exports = { rollback };
// [END spanner_v1_spanner_rollback]
