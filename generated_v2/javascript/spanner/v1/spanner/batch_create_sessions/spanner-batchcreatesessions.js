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

// [START spanner_v1_spanner_sessions_batchcreate]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the batchCreateSessions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The Cloud Spanner instance ID.
 * @param {string} databaseId - The Cloud Spanner database ID.
 * @param {number} sessionCount - The number of sessions to be created in this batch call. Must be at least 1.
 */
async function batchCreateSessions(projectId, instanceId, databaseId, sessionCount) {
  try {
    const database = client.databasePath(projectId, instanceId, databaseId);
    const request = {
      database,
      sessionCount,
    };

    const [response] = await client.batchCreateSessions(request);

    console.log(`Created ${response.session.length} sessions:`);
    for (const session of response.session) {
      console.log(`Session: ${session.name}`);
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Database not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error during session creation: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { batchCreateSessions };
// [END spanner_v1_spanner_sessions_batchcreate]
