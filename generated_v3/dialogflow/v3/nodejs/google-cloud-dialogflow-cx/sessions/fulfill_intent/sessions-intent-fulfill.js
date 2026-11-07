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

// [START dialogflow_v3_sessions_fulfill_intent]
'use strict';

const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new SessionsClient();

/**
 * Use the fulfillIntent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the Dialogflow CX agent (e.g., 'global' or regional ID).
 * @param {string} agentId - The unique identifier (UUID) of the Dialogflow CX agent.
 * @param {string} sessionId - The unique identifier of the session. Up to 36 characters, chosen by the client.
 */
async function fulfillIntent(projectId, locationId, agentId, sessionId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const sessionClient = locationId && locationId !== 'global'
      ? new SessionsClient(clientOptions)
      : client;

    const sessionPath = sessionClient.projectLocationAgentSessionPath(
      projectId,
      locationId,
      agentId,
      sessionId
    );

    const queryInput = {
      text: {
        text: 'example-query-text',
      },
      languageCode: 'en',
    };

    const matchIntentRequest = {
      session: sessionPath,
      queryInput,
    };

    // Obtains intent matches to select the match for fulfillment
    const [matchResponse] = await sessionClient.matchIntent(matchIntentRequest);
    const matchedIntent = matchResponse.matches && matchResponse.matches.length > 0
      ? matchResponse.matches[0]
      : null;

    const fulfillIntentRequest = {
      matchIntentRequest,
      match: matchedIntent,
    };

    const [response] = await sessionClient.fulfillIntent(fulfillIntentRequest);

    console.log(`Fulfilled response ID: ${response.responseId}`);
    if (response.queryResult && response.queryResult.responseMessages) {
      for (const message of response.queryResult.responseMessages) {
        if (message.text && message.text.text) {
          console.log(`Response text: ${message.text.text.join(' ')}`);
        }
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to fulfill intent: ${err.message}`);
    }
  }
}

module.exports = { fulfillIntent };
// [END dialogflow_v3_sessions_fulfill_intent]
