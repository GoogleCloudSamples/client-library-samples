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

// [START dialogflow_v3_tools_tool_update]
'use strict';

const {ToolsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new ToolsClient();

/**
 * Use the updateTool method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the Dialogflow CX agent (for example, 'global' or 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 * @param {string} toolId - The unique identifier of the tool to update.
 */
async function updateTool(projectId, locationId, agentId, toolId) {
  try {
    const tool = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/tools/${toolId}`,
      displayName: 'example-updated-tool',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    let toolsClient = client;
    if (locationId && locationId !== 'global') {
      toolsClient = new ToolsClient({
        apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
      });
    }

    const [response] = await toolsClient.updateTool({
      tool,
      updateMask,
    });

    console.log(`Updated tool: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tool not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update tool: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTool };
// [END dialogflow_v3_tools_tool_update]
