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

// [START managedkafka_v1_managedschemaregistry_schemaregistries_list]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Lists schema registries in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listSchemaRegistries(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listSchemaRegistries(request);
    const schemaRegistries = Array.isArray(response)
      ? response
      : (response?.schemaRegistries || []);

    if (schemaRegistries.length === 0) {
      console.log('No schema registries found.');
      return;
    }

    console.log(`Found ${schemaRegistries.length} schema registry instance(s):`);
    for (const registry of schemaRegistries) {
      console.log(`- ${registry.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified location was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks permission to access specified resource.');
    } else {
      console.error('Failed to list schema registries:', err);
    }
  }
}

module.exports = { listSchemaRegistries };
// [END managedkafka_v1_managedschemaregistry_schemaregistries_list]
