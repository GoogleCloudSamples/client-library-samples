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

// [START spanner_v1_spanner_session_delete]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the deleteSession method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Spanner instance.
 * @param {string} instanceId - The caller-chosen identifier of the existing Cloud Spanner instance.
 * @param {string} databaseId - The caller-chosen identifier of the existing Cloud Spanner database.
 * @param {string} sessionId - The server-generated ID of the session to delete.
 */
async function deleteSession(projectId, instanceId, databaseId, sessionId) {
  try {
    // Construct the fully qualified session resource name
    const name = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;

    const request = {
      name,
    };

    // Release the session resource on the Cloud Spanner server
    await client.deleteSession(request);
    console.log(`Deleted session: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Session not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete session: ${err.message}`);
    }
  }
}

module.exports = { deleteSession };
// [END spanner_v1_spanner_session_delete]
