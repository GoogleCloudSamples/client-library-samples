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

// [START dialogflow_v3beta1_agents_agent_delete]
'use strict';

const {AgentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new AgentsClient();

/**
 * Use the deleteAgent method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent. Read this value from an existing agent resource (e.g., from CreateAgent or ListAgents).
 */
async function deleteAgent(projectId, locationId, agentId) {
  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

  try {
    const request = {
      name,
    };

    await client.deleteAgent(request);
    console.log(`Deleted agent: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while attempting to delete agent: ${name}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteAgent };
// [END dialogflow_v3beta1_agents_agent_delete]
