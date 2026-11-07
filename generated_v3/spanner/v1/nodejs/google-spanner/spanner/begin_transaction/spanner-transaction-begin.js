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

// [START spanner_v1_spanner_begin_transaction]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the beginTransaction method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen identifier of the Cloud Spanner instance.
 * @param {string} databaseId - The caller-chosen identifier of the Cloud Spanner database.
 * @param {string} sessionId - The server-generated identifier of the Cloud Spanner session, obtained from CreateSession or ListSessions.
 */
async function beginTransaction(projectId, instanceId, databaseId, sessionId) {
  try {
    // Configure options with read_write: {} to start a read-write transaction.
    const options = {
      readWrite: {},
    };
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;

    const [response] = await client.beginTransaction({
      session,
      options,
    });

    const transactionId = Buffer.from(response.id).toString('base64');
    console.log(`Started transaction with ID: ${transactionId}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Session was not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to begin transaction: ${err.message}`);
    }
  }
}

module.exports = { beginTransaction };
// [END spanner_v1_spanner_begin_transaction]
