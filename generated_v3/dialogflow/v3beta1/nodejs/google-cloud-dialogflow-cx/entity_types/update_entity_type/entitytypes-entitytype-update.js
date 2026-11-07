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

// [START dialogflow_v3beta1_entitytypes_entitytype_update]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Updates an entity type in Dialogflow CX.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location or region where the agent is hosted (for example, 'global' or 'us-central1').
 * @param {string} agentId - The ID of the Dialogflow CX agent.
 * @param {string} entityTypeId - The ID of the Dialogflow CX entity type to update.
 */
async function updateEntityType(projectId, locationId, agentId, entityTypeId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new EntityTypesClient(clientOptions);

  try {
    const entityType = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/entityTypes/${entityTypeId}`,
      displayName: 'example-updated-display-name',
      kind: 'KIND_MAP',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      entityType,
      updateMask,
    };

    const [response] = await client.updateEntityType(request);

    console.log(`Updated entity type: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entity type not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateEntityType };
// [END dialogflow_v3beta1_entitytypes_entitytype_update]
