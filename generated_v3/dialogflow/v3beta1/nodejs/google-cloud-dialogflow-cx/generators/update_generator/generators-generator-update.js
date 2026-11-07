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

// [START dialogflow_v3beta1_generators_generator_update]
'use strict';

const {GeneratorsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new GeneratorsClient();

/**
 * Use the updateGenerator method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The region or location ID of the Dialogflow CX agent (e.g., 'global', 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 * @param {string} generatorId - The unique identifier of the generator to update.
 */
async function updateGenerator(projectId, locationId, agentId, generatorId) {
  try {
    const generator = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/generators/${generatorId}`,
      displayName: 'example-updated-display-name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      generator,
      updateMask,
    };

    // Update the generator display name using the field mask
    const [response] = await client.updateGenerator(request);

    console.log(`Updated generator: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Generator not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update generator: ${err.message}`);
    }
  }
}

module.exports = { updateGenerator };
// [END dialogflow_v3beta1_generators_generator_update]
