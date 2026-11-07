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

// [START dialogflow_v3_playbooks_playbooks_list]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PlaybooksClient();

/**
 * Use the listPlaybooks method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 */
async function listPlaybooks(projectId, locationId, agentId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const request = {
      parent,
    };

    const [playbooks] = await client.listPlaybooks(request);

    for (const playbook of playbooks) {
      console.log(`Playbook Name: ${playbook.name}`);
      console.log(`Display Name: ${playbook.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The specified agent or parent resource does not exist.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks required permissions to list playbooks.');
    } else {
      console.error(`API operation failed with error: ${err.message}`);
    }
  }
}

module.exports = { listPlaybooks };
// [END dialogflow_v3_playbooks_playbooks_list]
