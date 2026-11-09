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

// [START dialogflow_v3_flows_flows_list]
'use strict';

const {FlowsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new FlowsClient();

/**
 * Use the listFlows method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - The server-generated identifier of the agent; retrieve it from an existing Dialogflow CX agent.
 */
async function listFlows(projectId, locationId, agentId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    // Target the regional endpoint when the agent location is not global.
    const flowsClient =
      locationId && locationId !== 'global'
        ? new FlowsClient({apiEndpoint: `${locationId}-dialogflow.googleapis.com`})
        : client;

    const request = {
      parent,
    };

    const [flows] = await flowsClient.listFlows(request);

    for (const flow of flows) {
      console.log(`Flow display name: ${flow.displayName}`);
      console.log(`Flow resource name: ${flow.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { listFlows };
// [END dialogflow_v3_flows_flows_list]
