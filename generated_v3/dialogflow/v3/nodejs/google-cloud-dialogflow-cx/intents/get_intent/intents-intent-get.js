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

// [START dialogflow_v3_intents_intent_get]
'use strict';

const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves the specified Dialogflow CX intent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - The agent ID (for example, 'example-agent-id').
 * @param {string} intentId - The intent ID (for example, 'example-intent-id').
 */
async function getIntent(projectId, locationId, agentId, intentId) {
  const client = new IntentsClient({
    apiEndpoint:
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`,
  });

  try {
    // Construct the fully-qualified intent resource identifier
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/intents/${intentId}`;

    const request = {
      name,
    };

    const [intent] = await client.getIntent(request);

    console.log(`Intent Display Name: ${intent.displayName}`);
    console.log(`Intent Name: ${intent.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Intent not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to retrieve intent: ${err.message}`);
    }
  }
}

module.exports = {getIntent};
// [END dialogflow_v3_intents_intent_get]
