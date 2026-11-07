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

// [START spanner_v1_spanner_execute_sql]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the executeSql method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen ID of the Spanner instance.
 * @param {string} databaseId - The caller-chosen ID of the Spanner database.
 * @param {string} sessionId - The system-assigned ID of the Spanner session.
 */
async function executeSql(projectId, instanceId, databaseId, sessionId) {
  try {
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const sql = 'SELECT 1';

    const request = {
      session,
      sql,
    };

    const [response] = await client.executeSql(request);

    console.log('Query executed successfully.');
    console.log(`Rows: ${JSON.stringify(response.rows)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { executeSql };
// [END spanner_v1_spanner_execute_sql]
