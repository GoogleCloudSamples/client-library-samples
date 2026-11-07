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

// [START dialogflow_v3_agents_agent_update]
'use strict';

const {AgentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Updates an existing Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the agent (for example, 'global').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 */
async function updateAgent(projectId, locationId, agentId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new AgentsClient(clientOptions);

  try {
    const agent = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}`,
      description: 'Updated agent description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      agent,
      updateMask,
    };

    const [response] = await client.updateAgent(request);
    console.log(`Updated agent: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update agent: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateAgent };
// [END dialogflow_v3_agents_agent_update]
