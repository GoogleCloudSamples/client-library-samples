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

// [START dialogflow_v3beta1_agents_agent_get]
'use strict';

const {AgentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dialogflow CX agent.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the agent is located (for example, 'us-central1')
 * @param {string} agentId - Server-generated agent ID (for example, 'example-agent-id')
 */
async function getAgent(projectId, locationId, agentId) {
  // Specify regional endpoint when the location is not global
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new AgentsClient({apiEndpoint});

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
  const request = {
    name,
  };

  try {
    const [agent] = await client.getAgent(request);

    console.log(`Agent display name: ${agent.displayName}`);
    console.log(`Agent resource name: ${agent.name}`);
    return agent;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getAgent};
// [END dialogflow_v3beta1_agents_agent_get]
