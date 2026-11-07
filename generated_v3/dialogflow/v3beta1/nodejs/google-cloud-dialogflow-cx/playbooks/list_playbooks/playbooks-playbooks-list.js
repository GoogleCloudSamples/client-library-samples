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

// [START dialogflow_v3beta1_playbooks_playbooks_list]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PlaybooksClient();

/**
 * Use the listPlaybooks method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location where the Dialogflow CX agent is hosted (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX Agent (for example, read from an existing agent).
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
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listPlaybooks };
// [END dialogflow_v3beta1_playbooks_playbooks_list]
