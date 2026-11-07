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

// [START spanner_v1_spanner_read]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the read method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen ID of the Cloud Spanner instance.
 * @param {string} databaseId - The caller-chosen ID of the Cloud Spanner database.
 * @param {string} sessionId - The server-generated ID of the Spanner session.
 */
async function read(projectId, instanceId, databaseId, sessionId) {
  try {
    const table = 'Singers';
    const keySet = {all: true};
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const columns = ['SingerId', 'FirstName', 'LastName'];

    const request = {
      session,
      table,
      columns,
      keySet,
    };

    const [response] = await client.read(request);
    console.log(`Retrieved ${response.rows ? response.rows.length : 0} rows.`);
    if (response.rows) {
      for (const row of response.rows) {
        console.log('Row values:', row.values);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Requested resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing Spanner:', err.message);
    } else {
      console.error('Spanner read operation failed:', err.message);
    }
  }
}

module.exports = { read };
// [END spanner_v1_spanner_read]
