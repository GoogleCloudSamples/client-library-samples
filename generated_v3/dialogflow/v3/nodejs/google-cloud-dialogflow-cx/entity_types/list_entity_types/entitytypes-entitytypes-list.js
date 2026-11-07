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

// [START dialogflow_v3_entitytypes_entitytypes_list]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists entity types for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location of the agent (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 */
async function listEntityTypes(projectId, locationId, agentId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new EntityTypesClient(clientOptions);

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    const request = {
      parent,
    };

    const [entityTypes] = await client.listEntityTypes(request);

    for (const entityType of entityTypes) {
      console.log(`Display Name: ${entityType.displayName}`);
      console.log(`Name: ${entityType.name}`);
    }

    return entityTypes;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listEntityTypes};
// [END dialogflow_v3_entitytypes_entitytypes_list]
