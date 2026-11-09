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

// [START dialogflow_v3beta1_playbooks_playbook_get]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dialogflow CX playbook.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '12345678-abcd-ef01-2345-6789abcdef01')
 * @param {string} playbookId - The server-generated ID of the Playbook (for example, '12345678-abcd-ef01-2345-6789abcdef01')
 */
async function getPlaybook(projectId, locationId, agentId, playbookId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new PlaybooksClient(clientOptions);

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}`;

    const request = {
      name,
    };

    const [playbook] = await client.getPlaybook(request);

    console.log(`Playbook Name: ${playbook.name}`);
    console.log(`Display Name: ${playbook.displayName}`);
    console.log(`Goal: ${playbook.goal}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to retrieve playbook: ${err.message}`);
    }
  }
}

module.exports = {getPlaybook};
// [END dialogflow_v3beta1_playbooks_playbook_get]
