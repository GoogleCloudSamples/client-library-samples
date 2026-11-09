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

// [START dialogflow_v3_playbooks_playbookversion_create]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PlaybooksClient();

/**
 * Use the createPlaybookVersion method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} playbookId - ID of the Playbook (for example, 'example-playbook-id')
 */
async function createPlaybookVersion(projectId, locationId, agentId, playbookId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}`;
    const playbookVersion = {
      description: 'Initial version',
    };

    const request = {
      parent,
      playbookVersion,
    };

    const [response] = await client.createPlaybookVersion(request);
    console.log(`Created playbook version: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook resource not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Playbook version already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create playbook version: ${err.message}`);
    }
  }
}

module.exports = { createPlaybookVersion };
// [END dialogflow_v3_playbooks_playbookversion_create]
