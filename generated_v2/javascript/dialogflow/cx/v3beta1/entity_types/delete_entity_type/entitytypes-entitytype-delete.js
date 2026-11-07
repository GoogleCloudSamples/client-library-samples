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

// [START dialogflow_v3beta1_entitytypes_entitytype_delete]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a specified entity type from a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located (for example, 'us-central1' or 'global').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} entityTypeId - The server-generated ID of the entity type to delete.
 */
async function deleteEntityType(projectId, locationId, agentId, entityTypeId) {
  const client = new EntityTypesClient({
    apiEndpoint:
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/entityTypes/${entityTypeId}`;

  const request = {
    name,
  };

  try {
    await client.deleteEntityType(request);
    console.log(`Deleted entity type: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entity type not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Entity type deletion failed precondition: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteEntityType };
// [END dialogflow_v3beta1_entitytypes_entitytype_delete]
