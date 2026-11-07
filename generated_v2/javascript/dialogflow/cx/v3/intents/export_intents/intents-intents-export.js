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

// [START dialogflow_v3_intents_export_intents]
'use strict';

const {IntentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Exports intents from a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the agent is located (for example, 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} intentId - The server-generated ID of the intent to export.
 */
async function exportIntents(projectId, locationId, agentId, intentId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new IntentsClient(clientOptions);

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const intents = [
      `projects/${projectId}/locations/${locationId}/agents/${agentId}/intents/${intentId}`,
    ];
    const intentsContentInline = true;

    const [operation] = await client.exportIntents({
      parent,
      intents,
      intentsContentInline,
    });

    const [response] = await operation.promise();
    console.log('Exported intents successfully.');
    if (response.intentsContent) {
      console.log(`Exported content size: ${response.intentsContent.length} bytes`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Export intents failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { exportIntents };
// [END dialogflow_v3_intents_export_intents]
