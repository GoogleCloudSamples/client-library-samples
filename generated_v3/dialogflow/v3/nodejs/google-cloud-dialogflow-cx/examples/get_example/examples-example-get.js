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

// [START dialogflow_v3_examples_example_get]
'use strict';

const {ExamplesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new ExamplesClient();

/**
 * Retrieves a specific example from a Dialogflow CX playbook.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX service is located (for example, 'us-central1' or 'global').
 * @param {string} agentId - The ID of the Dialogflow CX agent.
 * @param {string} playbookId - The ID of the playbook.
 * @param {string} exampleId - The ID of the example to retrieve.
 */
async function getExample(projectId, locationId, agentId, playbookId, exampleId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}/examples/${exampleId}`;

    const request = {
      name,
    };

    const [example] = await client.getExample(request);

    console.log(`Retrieved example: ${example.name}`);
    console.log(`Display name: ${example.displayName}`);
    return example;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Example not found: projects/${projectId}/locations/${locationId}/agents/${agentId}/playbooks/${playbookId}/examples/${exampleId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing example in project: ${projectId}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getExample };
// [END dialogflow_v3_examples_example_get]
