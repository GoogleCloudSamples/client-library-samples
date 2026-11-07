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

// [START dialogflow_v3_flows_flow_update]
'use strict';

const {FlowsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new FlowsClient();

/**
 * Use the updateFlow method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dialogflow CX location ID (e.g., 'global' or 'us-central1').
 * @param {string} agentId - The ID of the Dialogflow CX agent.
 * @param {string} flowId - The ID of the flow to update.
 */
async function updateFlow(projectId, locationId, agentId, flowId) {
  try {
    const flow = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}`,
      description: 'Updated flow description demonstrating Flow updates.',
    };
    const updateMask = {
      paths: ['description'],
    };

    // Instantiate a regional client if the location is not global
    const flowsClient =
      locationId && locationId !== 'global'
        ? new FlowsClient({
            apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
          })
        : client;

    const request = {
      flow,
      updateMask,
    };

    const [response] = await flowsClient.updateFlow(request);

    console.log(`Updated flow: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Flow not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error updating flow: ${err.message}`);
    }
  }
}

module.exports = { updateFlow };
// [END dialogflow_v3_flows_flow_update]
