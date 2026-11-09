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

// [START dialogflow_v3_generators_generator_get]
'use strict';

const {GeneratorsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dialogflow CX generator.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located.
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} generatorId - The server-generated ID of the generator.
 */
async function getGenerator(projectId, locationId, agentId, generatorId) {
  const apiEndpoint =
    locationId && locationId !== 'global'
      ? `${locationId}-dialogflow.googleapis.com`
      : 'dialogflow.googleapis.com';

  const client = new GeneratorsClient({apiEndpoint});

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/generators/${generatorId}`;

  const request = {
    name,
  };

  try {
    const [response] = await client.getGenerator(request);

    console.log(`Retrieved generator: ${response.displayName}`);
    console.log(`Resource name: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Generator not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to retrieve generator: ${err.message}`);
    }
  }
}

module.exports = {getGenerator};
// [END dialogflow_v3_generators_generator_get]
