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

// [START dataproc_v1_sessioncontroller_session_create]
'use strict';

const {SessionControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a Dataproc session.
 *
 * @param {string} sessionId - The caller-chosen ID to use for the session, which becomes the final component of the session's resource name. Must be 4-63 characters containing lowercase letters, numbers, and hyphens.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dataproc location (region) where the session is created (for example, 'us-central1').
 */
async function createSession(sessionId, projectId, locationId) {
  // Dataproc is a regional service requiring the regional API endpoint.
  const client = new SessionControllerClient({
    apiEndpoint: `${locationId}-dataproc.googleapis.com`,
  });

  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const session = {
      jupyterSession: {
        kernel: 'PYTHON',
      },
    };

    const request = {
      parent,
      session,
      sessionId,
    };

    // Dataproc session creation is a long-running operation.
    const [operation] = await client.createSession(request);
    const [response] = await operation.promise();

    console.log(`Created session: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Session already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createSession };
// [END dataproc_v1_sessioncontroller_session_create]
