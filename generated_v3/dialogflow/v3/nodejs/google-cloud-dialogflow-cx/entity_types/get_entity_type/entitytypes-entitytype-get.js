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

// [START dialogflow_v3_entitytypes_entitytype_get]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves an entity type from a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} entityTypeId - ID of the EntityType (for example, 'example-entitytype-id')
 */
async function getEntityType(projectId, locationId, agentId, entityTypeId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new EntityTypesClient({apiEndpoint});

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/entityTypes/${entityTypeId}`;

    const request = {
      name,
    };

    const [response] = await client.getEntityType(request);
    console.log(`Retrieved entity type: ${response.displayName}`);
    console.log(`Entity type ID: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entity type not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve entity type: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEntityType };
// [END dialogflow_v3_entitytypes_entitytype_get]
