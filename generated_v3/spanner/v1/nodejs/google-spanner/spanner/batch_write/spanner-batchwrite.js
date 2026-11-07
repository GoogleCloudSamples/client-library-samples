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

// [START spanner_v1_spanner_batch_write]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the batchWrite method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Spanner instance.
 * @param {string} databaseId - The ID of the Spanner database.
 * @param {string} sessionId - The server-generated ID of the Spanner session.
 */
async function batchWrite(projectId, instanceId, databaseId, sessionId) {
  try {
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;

    // Construct an idempotent mutation to safely permit replays
    const singerValues = [
      {stringValue: '1'},
      {stringValue: 'Marc'},
      {stringValue: 'Richards'},
    ];
    const singerMutation = {
      insertOrUpdate: {
        table: 'Singers',
        columns: ['SingerId', 'FirstName', 'LastName'],
        values: [{values: singerValues}],
      },
    };
    const mutationGroups = [
      {
        mutations: [singerMutation],
      },
    ];

    const request = {
      session,
      mutationGroups,
    };

    const responseStream = client.batchWrite(request);
    for await (const response of responseStream) {
      if (response.status && response.status.code !== status.OK) {
        console.error(
          `Mutation group failed with status code ${response.status.code}: ${response.status.message}`
        );
      } else {
        const commitSeconds = response.commitTimestamp ? response.commitTimestamp.seconds : 'unknown';
        console.log(`Mutation group committed successfully at timestamp: ${commitSeconds}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { batchWrite };
// [END spanner_v1_spanner_batch_write]
