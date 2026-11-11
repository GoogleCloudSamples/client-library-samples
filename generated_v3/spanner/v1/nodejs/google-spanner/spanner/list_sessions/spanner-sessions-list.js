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

// [START spanner_v1_spanner_sessions_list]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Lists Cloud Spanner sessions in a database.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The Cloud Spanner instance ID.
 * @param {string} databaseId - The Cloud Spanner database ID.
 */
async function listSessions(projectId, instanceId, databaseId) {
  try {
    const database = client.databasePath(projectId, instanceId, databaseId);
    const request = {
      database,
    };

    const [sessions] = await client.listSessions(request);
    console.log(`Retrieved ${sessions.length} session(s).`);
    for (const session of sessions) {
      console.log(`Session: ${session.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Database not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listSessions };
// [END spanner_v1_spanner_sessions_list]
