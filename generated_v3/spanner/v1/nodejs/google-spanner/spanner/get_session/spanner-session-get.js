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

// [START spanner_v1_spanner_session_get]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the getSession method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Cloud Spanner instance.
 * @param {string} instanceId - The Cloud Spanner instance ID.
 * @param {string} databaseId - The Cloud Spanner database ID.
 * @param {string} sessionId - The server-generated session ID to retrieve.
 */
async function getSession(projectId, instanceId, databaseId, sessionId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const request = {
      name,
    };

    const [response] = await client.getSession(request);
    console.log(`Retrieved session: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Session not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Spanner API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getSession };
// [END spanner_v1_spanner_session_get]
