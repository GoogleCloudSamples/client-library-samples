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

// [START dialogflow_v3beta1_intents_intent_delete]
'use strict';

const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Dialogflow CX intent.
 *
 * @param {string} projectId Google Cloud project ID.
 * @param {string} locationId Google Cloud region or location where the Dialogflow CX agent is hosted.
 * @param {string} agentId Identifier of the Dialogflow CX agent.
 * @param {string} intentId Identifier of the intent to delete.
 */
async function deleteIntent(projectId, locationId, agentId, intentId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new IntentsClient(clientOptions);

    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/intents/${intentId}`;

    const request = {
      name,
    };

    await client.deleteIntent(request);
    console.log(`Deleted intent: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Intent not found: ${intentId}`);
    } else {
      console.error(`Failed to delete intent: ${err.message}`);
    }
  }
}

module.exports = {deleteIntent};
// [END dialogflow_v3beta1_intents_intent_delete]
