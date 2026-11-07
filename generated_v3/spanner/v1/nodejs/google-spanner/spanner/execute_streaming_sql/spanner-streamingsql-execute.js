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

// [START spanner_v1_spanner_execute_streaming_sql]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Executes a SQL query against Cloud Spanner and streams the results.
 */
async function executeStreamingSql() {
  try {
    const session = 'example-session';
    const sql = 'example-sql';

    const request = {
      session,
      sql,
    };

    // Execute the streaming query to retrieve results in chunks
    const stream = client.executeStreamingSql(request);

    let chunkCount = 0;
    for await (const response of stream) {
      chunkCount += 1;
      if (response.metadata) {
        console.log('Result metadata:', JSON.stringify(response.metadata));
      }
      if (response.values) {
        console.log(`Received chunk #${chunkCount} with ${response.values.length} values.`);
      }
    }

    console.log(`Successfully completed streaming SQL query. Total chunks: ${chunkCount}.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Session not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid query argument:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for Spanner database:', err.message);
    } else {
      console.error('Failed to execute streaming SQL query:', err);
    }
  }
}

module.exports = { executeStreamingSql };
// [END spanner_v1_spanner_execute_streaming_sql]
