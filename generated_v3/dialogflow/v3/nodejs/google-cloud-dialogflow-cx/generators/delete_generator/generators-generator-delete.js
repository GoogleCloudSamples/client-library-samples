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

// [START dialogflow_v3_generators_generator_delete]
'use strict';

const {GeneratorsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Dialogflow CX generator.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '12345678-abcd-ef01-2345-6789abcdef01').
 * @param {string} generatorId - The server-generated ID of the generator to delete (for example, 'generator-1234').
 */
async function deleteGenerator(projectId, locationId, agentId, generatorId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;
  const client = new GeneratorsClient({apiEndpoint});

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/generators/${generatorId}`;

  try {
    const request = {
      name,
    };

    await client.deleteGenerator(request);
    console.log(`Deleted generator: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Generator not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting generator: ${name}`);
    } else {
      console.error(`Failed to delete generator: ${err.message}`);
    }
  }
}

module.exports = { deleteGenerator };
// [END dialogflow_v3_generators_generator_delete]
