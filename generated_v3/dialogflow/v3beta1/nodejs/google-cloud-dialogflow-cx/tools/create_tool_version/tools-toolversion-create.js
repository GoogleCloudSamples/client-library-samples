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

// [START dialogflow_v3beta1_tools_toolversion_create]
'use strict';

const {ToolsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a version snapshot for a Dialogflow CX tool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region for the agent and tool (for example, 'us-central1').
 * @param {string} agentId - The unique ID of the Dialogflow CX agent (for example, 'example-agent-id').
 * @param {string} toolId - The unique ID of the Dialogflow CX tool (for example, 'example-tool-id').
 */
async function createToolVersion(projectId, locationId, agentId, toolId) {
  try {
    const apiEndpoint =
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`;
    const client = new ToolsClient({apiEndpoint});

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/tools/${toolId}`;
    const toolVersion = {
      displayName: 'v1.0.0',
      tool: {
        displayName: 'Sample Tool',
        description: 'Snapshot of the tool',
        functionSpec: {},
      },
    };

    const [response] = await client.createToolVersion({
      parent,
      toolVersion,
    });

    console.log(`Created tool version: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tool version already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createToolVersion};
// [END dialogflow_v3beta1_tools_toolversion_create]
