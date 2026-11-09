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

// [START dialogflow_v3beta1_intents_intent_update]
'use strict';

const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Updates an existing Dialogflow CX intent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The region of the Dialogflow CX agent (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} intentId - The server-generated ID of the Dialogflow CX intent.
 */
async function updateIntent(projectId, locationId, agentId, intentId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new IntentsClient(clientOptions);

  try {
    const intent = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/intents/${intentId}`,
      description: 'Updated description for this intent',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      intent,
      updateMask,
    };

    const [response] = await client.updateIntent(request);
    console.log(`Updated intent: ${response.name}`);
    console.log(`Intent description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Intent not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update intent: ${err.message}`);
    }
  }
}

module.exports = { updateIntent };
// [END dialogflow_v3beta1_intents_intent_update]
