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

// [START dialogflow_v3_playbooks_playbook_delete]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Dialogflow CX playbook.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Dialogflow CX agent location (for example, 'us-central1' or 'global').
 * @param {string} agentId - Dialogflow CX agent ID.
 * @param {string} playbookId - ID of the playbook to delete.
 */
async function deletePlaybook(projectId, locationId, agentId, playbookId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new PlaybooksClient(clientOptions);

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}`;
  const request = {
    name,
  };

  try {
    await client.deletePlaybook(request);
    console.log(`Deleted playbook: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting playbook: ${err.message}`);
    } else {
      console.error(`Failed to delete playbook: ${err.message}`);
    }
  }
}

module.exports = {deletePlaybook};
// [END dialogflow_v3_playbooks_playbook_delete]
