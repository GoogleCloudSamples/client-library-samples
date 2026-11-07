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

// [START dialogflow_v3_sessions_detect_intent]
'use strict';

const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Detects intent from user input in a Dialogflow CX session.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the agent is located (for example, 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 * @param {string} sessionId - The unique identifier for the conversation session (up to 36 characters).
 */
async function detectIntent(projectId, locationId, agentId, sessionId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new SessionsClient(clientOptions);

  try {
    const session = `projects/${projectId}/locations/${locationId}/agents/${agentId}/sessions/${sessionId}`;
    const queryInput = {
      text: {
        text: 'hello',
      },
      languageCode: 'en',
    };

    const request = {
      session,
      queryInput,
    };

    const [response] = await client.detectIntent(request);

    console.log(`Detected intent: ${response.queryResult?.intent?.displayName || 'None'}`);
    for (const message of response.queryResult?.responseMessages || []) {
      if (message.text?.text) {
        console.log(`Agent response: ${message.text.text.join(' ')}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC error ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { detectIntent };
// [END dialogflow_v3_sessions_detect_intent]
