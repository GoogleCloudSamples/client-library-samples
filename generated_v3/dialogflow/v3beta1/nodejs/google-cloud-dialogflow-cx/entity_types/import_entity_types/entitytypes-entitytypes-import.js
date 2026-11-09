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

// [START dialogflow_v3beta1_entitytypes_import_entity_types]
'use strict';

const {EntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new EntityTypesClient();

/**
 * Use the importEntityTypes method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location where the Dialogflow CX agent is hosted (e.g., 'global' or 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 */
async function importEntityTypes(projectId, locationId, agentId) {
  try {
    const mergeOption = 'MERGE';
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const entityTypesContent = {
      content: Buffer.from(
        JSON.stringify({
          entityTypes: [
            {
              displayName: 'example-size',
              kind: 'KIND_MAP',
              entities: [
                {value: 'small', synonyms: ['small', 's']},
                {value: 'medium', synonyms: ['medium', 'm']},
                {value: 'large', synonyms: ['large', 'l']},
              ],
            },
          ],
        })
      ),
    };

    const request = {
      parent,
      entityTypesContent,
      mergeOption,
    };

    const [operation] = await client.importEntityTypes(request);
    const [response] = await operation.promise();

    console.log('Imported entity types:');
    if (response.entityTypes) {
      for (const entityType of response.entityTypes) {
        console.log(`- ${entityType}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dialogflow CX resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to import entity types: ${err.message}`);
    }
  }
}

module.exports = { importEntityTypes };
// [END dialogflow_v3beta1_entitytypes_import_entity_types]
