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

// [START dialogflow_v3_playbooks_playbookversions_list]
'use strict';

const {PlaybooksClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists playbook versions for a specified playbook.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} playbookId - ID of the Playbook (for example, 'example-playbook-id')
 */
async function listPlaybookVersions(projectId, locationId, agentId, playbookId) {
  const apiEndpoint = locationId === 'global'
    ? 'dialogflow.googleapis.com'
    : `${locationId}-dialogflow.googleapis.com`;
  const client = new PlaybooksClient({apiEndpoint});

  const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}`;

  const request = {
    parent,
  };

  try {
    const [playbookVersions] = await client.listPlaybookVersions(request);

    console.log(`Retrieved ${playbookVersions.length} playbook version(s):`);
    for (const version of playbookVersions) {
      console.log(`- Version: ${version.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Playbook not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listPlaybookVersions};
// [END dialogflow_v3_playbooks_playbookversions_list]
