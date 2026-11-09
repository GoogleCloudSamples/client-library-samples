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

// [START dialogflow_v3beta1_playbooks_playbook_delete]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PlaybooksClient();

/**
 * Use the deletePlaybook method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} playbookId - ID of the Playbook (for example, 'example-playbook-id')
 */
async function deletePlaybook(projectId, locationId, agentId, playbookId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}`;

    const request = {
      name,
    };

    await client.deletePlaybook(request);
    console.log(`Deleted playbook: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error deleting playbook: ${err.message}`);
    }
  }
}

module.exports = { deletePlaybook };
// [END dialogflow_v3beta1_playbooks_playbook_delete]
