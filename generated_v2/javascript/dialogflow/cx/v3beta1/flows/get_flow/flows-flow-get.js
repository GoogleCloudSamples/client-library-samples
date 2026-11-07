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

// [START dialogflow_v3beta1_flows_flow_get]
'use strict';

const {FlowsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves the specified flow.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id').
 * @param {string} flowId - ID of the Flow (for example, 'example-flow-id').
 */
async function getFlow(projectId, locationId, agentId, flowId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new FlowsClient(clientOptions);

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}`;
    const request = {
      name,
    };

    const [flow] = await client.getFlow(request);

    console.log(`Flow name: ${flow.name}`);
    console.log(`Display name: ${flow.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Flow not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getFlow };
// [END dialogflow_v3beta1_flows_flow_get]
