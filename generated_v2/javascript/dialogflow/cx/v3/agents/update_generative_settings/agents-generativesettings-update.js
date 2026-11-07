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

// [START dialogflow_v3_agents_generativesettings_update]
'use strict';

const {AgentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new AgentsClient();

/**
 * Updates generative settings for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dialogflow CX location ID (for example, 'global', 'us-central1').
 * @param {string} agentId - The unique ID of the Dialogflow CX agent.
 */
async function updateGenerativeSettings(projectId, locationId, agentId) {
  try {
    // Route requests to the appropriate regional endpoint if the agent is not global.
    const agentsClient =
      locationId && locationId !== 'global'
        ? new AgentsClient({apiEndpoint: `${locationId}-dialogflow.googleapis.com`})
        : client;

    const generativeSettings = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/generativeSettings`,
      languageCode: 'en',
      knowledgeConnectorSettings: {
        business: 'Example Business',
      },
    };

    const updateMask = {
      paths: ['knowledge_connector_settings.business'],
    };

    const request = {
      generativeSettings,
      updateMask,
    };

    const [response] = await agentsClient.updateGenerativeSettings(request);

    console.log(`Updated generative settings: ${response.name}`);
    console.log(
      `Updated business name: ${response.knowledgeConnectorSettings?.business}`
    );
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Generative settings not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update generative settings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateGenerativeSettings };
// [END dialogflow_v3_agents_generativesettings_update]
