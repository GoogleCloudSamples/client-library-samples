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

// [START dialogflow_v3beta1_sessions_streaming_detect_intent]
'use strict';

const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new SessionsClient();

/**
 * Use the streamingDetectIntent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The region of the Dialogflow CX agent (for example, 'global', 'us-central1').
 * @param {string} agentId - The unique ID of the Dialogflow CX agent.
 * @param {string} sessionId - The caller-chosen unique identifier of the session (up to 36 characters).
 */
async function streamingDetectIntent(projectId, locationId, agentId, sessionId) {
  try {
    const sessionsClient =
      locationId && locationId !== 'global'
        ? new SessionsClient({apiEndpoint: `${locationId}-dialogflow.googleapis.com`})
        : client;

    const sessionPath = sessionsClient.projectLocationAgentSessionPath(
      projectId,
      locationId,
      agentId,
      sessionId
    );

    const queryInput = {
      text: {
        text: 'Hello',
      },
      languageCode: 'en-US',
    };

    const stream = sessionsClient.streamingDetectIntent();

    stream.write({
      session: sessionPath,
      queryInput,
    });
    stream.end();

    for await (const response of stream) {
      const detectIntentResponse = response.detectIntentResponse;
      if (!detectIntentResponse) {
        continue;
      }

      console.log(`Response ID: ${detectIntentResponse.responseId}`);
      const queryResult = detectIntentResponse.queryResult;
      if (!queryResult) {
        continue;
      }

      if (queryResult.intent) {
        console.log(`Detected Intent: ${queryResult.intent.displayName}`);
      }
      for (const message of queryResult.responseMessages || []) {
        if (message.text && message.text.text) {
          console.log(`Agent Response: ${message.text.text.join(' ')}`);
        }
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { streamingDetectIntent };
// [END dialogflow_v3beta1_sessions_streaming_detect_intent]
