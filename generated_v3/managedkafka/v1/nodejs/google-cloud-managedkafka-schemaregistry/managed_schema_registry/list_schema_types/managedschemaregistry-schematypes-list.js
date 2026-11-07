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

// [START managedkafka_v1_managedschemaregistry_schematypes_list]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Lists the schema types supported by the specified Schema Registry.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} schemaRegistryId - ID of the SchemaRegistry (for example, 'example-schemaregistry-id')
 */
async function listSchemaTypes(projectId, locationId, schemaRegistryId) {
  try {
    const parent = client.schemaRegistryPath(projectId, locationId, schemaRegistryId);
    const request = {
      parent,
    };

    const [schemaTypes] = await client.listSchemaTypes(request);
    console.log(`Listed schema types for ${schemaRegistryId}:`);
    if (schemaTypes && schemaTypes.length > 0) {
      for (const schemaType of schemaTypes) {
        console.log(`- ${schemaType}`);
      }
    } else {
      console.log('No schema types found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list schema types: ${err.message}`);
    }
  }
}

module.exports = { listSchemaTypes };
// [END managedkafka_v1_managedschemaregistry_schematypes_list]
