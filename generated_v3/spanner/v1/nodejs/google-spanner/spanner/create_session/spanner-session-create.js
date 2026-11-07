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

// [START spanner_v1_spanner_session_create]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the createSession method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The Cloud Spanner instance ID.
 * @param {string} databaseId - The Cloud Spanner database ID.
 */
async function createSession(projectId, instanceId, databaseId) {
  try {
    const database = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}`;
    const session = {
      labels: {
        'example-label-key': 'example-label-value',
      },
    };

    const request = {
      database,
      session,
    };

    const [response] = await client.createSession(request);
    console.log(`Created Cloud Spanner session: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Database not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Session already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Cloud Spanner API error (code ${err.code}): ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { createSession };
// [END spanner_v1_spanner_session_create]
