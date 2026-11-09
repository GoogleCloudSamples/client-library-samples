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

// [START dialogflow_v3_intents_intents_list]
'use strict';

const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists intents for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID where the Dialogflow CX agent is located (for example, 'global', 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent. Sourced from the server-generated agent UUID.
 */
async function listIntents(projectId, locationId, agentId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new IntentsClient({apiEndpoint});

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const request = {
      parent,
    };

    const [intents] = await client.listIntents(request);

    console.log(`Retrieved ${intents.length} intents:`);
    for (const intent of intents) {
      console.log(`- Intent: ${intent.displayName} (${intent.name})`);
    }

    return intents;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list intents: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {listIntents};
// [END dialogflow_v3_intents_intents_list]
