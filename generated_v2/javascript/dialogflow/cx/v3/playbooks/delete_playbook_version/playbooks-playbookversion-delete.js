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

// [START dialogflow_v3_playbooks_playbookversion_delete]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a playbook version in a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located.
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} playbookId - The server-generated ID of the playbook.
 * @param {string} versionId - The server-generated ID of the playbook version to delete.
 */
async function deletePlaybookVersion(projectId, locationId, agentId, playbookId, versionId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new PlaybooksClient(clientOptions);

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}/versions/${versionId}`;

  const request = {
    name,
  };

  try {
    await client.deletePlaybookVersion(request);
    console.log(`Deleted playbook version: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
      throw err;
    }
  }
}

module.exports = {deletePlaybookVersion};
// [END dialogflow_v3_playbooks_playbookversion_delete]
