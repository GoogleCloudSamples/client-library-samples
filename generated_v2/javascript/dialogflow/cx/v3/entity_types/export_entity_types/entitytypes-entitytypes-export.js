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

// [START dialogflow_v3_entitytypes_export_entity_types]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Exports entity types from a Dialogflow CX agent.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud region where the agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - Unique identifier of the Dialogflow CX agent (for example, '12345678-1234-1234-1234-123456789abc').
 * @param {string} entityTypeId - Unique identifier of the entity type to export (for example, '12345678-1234-1234-1234-123456789abc').
 */
async function exportEntityTypes(projectId, locationId, agentId, entityTypeId) {
  // Regional Dialogflow CX agents require specifying the regional API endpoint.
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new EntityTypesClient({apiEndpoint});

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const entityTypes = [
      `projects/${projectId}/locations/${locationId}/agents/${agentId}/entityTypes/${entityTypeId}`,
    ];
    const entityTypesContentInline = true;

    const request = {
      parent,
      entityTypes,
      entityTypesContentInline,
    };

    // Initiate the long-running export operation and wait for completion
    const [operation] = await client.exportEntityTypes(request);
    const [response] = await operation.promise();

    console.log('Exported entity types successfully.');
    if (response.entityTypesContent) {
      console.log('Inline entity types content received.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Export entity types failed: ${err.message}`);
    }
  }
}

module.exports = { exportEntityTypes };
// [END dialogflow_v3_entitytypes_export_entity_types]
