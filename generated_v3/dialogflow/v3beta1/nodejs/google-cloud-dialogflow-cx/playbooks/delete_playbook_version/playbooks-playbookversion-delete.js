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

// [START dialogflow_v3beta1_playbooks_playbookversion_delete]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PlaybooksClient();

/**
 * Deletes a specified version of a Playbook.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} playbookId - ID of the Playbook (for example, 'example-playbook-id')
 * @param {string} versionId - ID of the Version (for example, 'example-version-id')
 */
async function deletePlaybookVersion(projectId, locationId, agentId, playbookId, versionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}/versions/${versionId}`;

    const request = {
      name,
    };

    await client.deletePlaybookVersion(request);
    console.log(`Deleted playbook version: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook version not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deletePlaybookVersion };
// [END dialogflow_v3beta1_playbooks_playbookversion_delete]
