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

// [START dialogflow_v3beta1_flows_export_flow]
'use strict';

const {FlowsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new FlowsClient();

/**
 * Use the exportFlow method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '12345678-1234-1234-1234-123456789abc'). Read it from an existing agent (such as from a ListAgents call or the Dialogflow CX console).
 * @param {string} flowId - The server-generated ID of the flow to export (for example, '00000000-0000-0000-0000-000000000000'). Read it from an existing flow (such as from a ListFlows call or use the default start flow '00000000-0000-0000-0000-000000000000').
 */
async function exportFlow(projectId, locationId, agentId, flowId) {
  try {
    let flowsClient = client;
    if (locationId && locationId !== 'global') {
      flowsClient = new FlowsClient({
        apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
      });
    }

    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}`;

    const request = {
      name,
    };

    // ExportFlow initiates a long-running operation.
    const [operation] = await flowsClient.exportFlow(request);

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Flow export completed successfully for: ${name}`);
    if (response.flowUri) {
      console.log(`Exported flow Cloud Storage URI: ${response.flowUri}`);
    } else if (response.flowContent) {
      console.log(
        `Exported flow content size: ${response.flowContent.length} bytes`
      );
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { exportFlow };
// [END dialogflow_v3beta1_flows_export_flow]
