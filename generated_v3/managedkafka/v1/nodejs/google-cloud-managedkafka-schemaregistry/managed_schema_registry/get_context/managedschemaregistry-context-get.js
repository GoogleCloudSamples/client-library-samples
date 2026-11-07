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

// [START managedkafka_v1_managedschemaregistry_context_get]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Use the getContext method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} schemaRegistryId - ID of the SchemaRegistry (for example, 'example-schemaregistry-id')
 * @param {string} contextId - The ID of the schema context (for example, 'default')
 */
async function getContext(projectId, locationId, schemaRegistryId, contextId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/schemaRegistries/${schemaRegistryId}/contexts/${contextId}`;
    const [context] = await client.getContext({name});

    console.log(`Context name: ${context.name}`);
    return context;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Context not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getContext };
// [END managedkafka_v1_managedschemaregistry_context_get]
