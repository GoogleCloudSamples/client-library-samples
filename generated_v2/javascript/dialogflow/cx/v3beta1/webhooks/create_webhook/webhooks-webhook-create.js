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

// [START dialogflow_v3beta1_webhooks_webhook_create]
'use strict';

const {WebhooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a webhook in a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Dialogflow CX agent (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated UUID of the Dialogflow CX agent (for example, 'b83014b2-03e7-4950-8b6b-3ebf90b9b6e1').
 */
async function createWebhook(projectId, locationId, agentId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new WebhooksClient(clientOptions);

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const webhook = {
      displayName: 'example-webhook',
      genericWebService: {
        uri: 'https://example.com/webhook',
      },
    };

    const request = {
      parent,
      webhook,
    };

    const [response] = await client.createWebhook(request);
    console.log(`Created webhook: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Webhook already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create webhook: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = {createWebhook};
// [END dialogflow_v3beta1_webhooks_webhook_create]
