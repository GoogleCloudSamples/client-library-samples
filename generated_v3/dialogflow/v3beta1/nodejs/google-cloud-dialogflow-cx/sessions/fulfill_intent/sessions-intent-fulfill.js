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

// [START dialogflow_v3beta1_sessions_fulfill_intent]
'use strict';

const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new SessionsClient();

/**
 * Fulfills an intent in a Dialogflow CX session.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the Dialogflow CX agent (for example, 'global' or 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 * @param {string} sessionId - The caller-chosen unique identifier of the session. Must not exceed 36 characters.
 */
async function fulfillIntent(projectId, locationId, agentId, sessionId) {
  try {
    // Configures regional endpoint when a non-global location is specified.
    const sessionsClient =
      locationId && locationId !== 'global'
        ? new SessionsClient({
            apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
          })
        : client;

    const sessionPath = sessionsClient.projectLocationAgentSessionPath
      ? sessionsClient.projectLocationAgentSessionPath(
          projectId,
          locationId,
          agentId,
          sessionId
        )
      : `projects/${projectId}/locations/${locationId}/agents/${agentId}/sessions/${sessionId}`;

    const matchIntentRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: 'hello',
        },
        languageCode: 'en',
      },
    };

    // Performs intent matching before fulfilling the matched intent.
    const [matchIntentResponse] =
      await sessionsClient.matchIntent(matchIntentRequest);
    const match = matchIntentResponse.matches[0];

    const fulfillIntentRequest = {
      matchIntentRequest,
      match,
    };

    // Fulfills the matched intent.
    const [response] =
      await sessionsClient.fulfillIntent(fulfillIntentRequest);

    console.log(`Response ID: ${response.responseId}`);
    const messages = response.queryResult?.responseMessages || [];
    for (const message of messages) {
      const texts = message.text?.text;
      if (texts) {
        console.log(`Agent response: ${texts.join(' ')}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
      return;
    }
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
      return;
    }
    if (err.code !== undefined) {
      console.error(`Google API error (${err.code}):`, err.message);
      return;
    }
    throw err;
  }
}

module.exports = { fulfillIntent };
// [END dialogflow_v3beta1_sessions_fulfill_intent]
