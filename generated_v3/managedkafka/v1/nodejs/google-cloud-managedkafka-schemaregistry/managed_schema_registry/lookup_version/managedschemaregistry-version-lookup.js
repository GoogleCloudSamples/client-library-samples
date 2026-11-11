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

// [START managedkafka_v1_managedschemaregistry_lookup_version]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Use the lookupVersion method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the schema registry is located.
 * @param {string} schemaRegistryId - The ID of the schema registry instance.
 * @param {string} subjectId - The ID or name of the schema subject (for example, a Kafka topic name).
 */
async function lookupVersion(projectId, locationId, schemaRegistryId, subjectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/schemaRegistries/${schemaRegistryId}/subjects/${subjectId}`;
    const schema = '{"type":"record","name":"User","fields":[{"name":"name","type":"string"}]}';

    const request = {
      parent,
      schema,
    };

    const [response] = await client.lookupVersion(request);

    console.log(`Schema version name: ${response.name}`);
    console.log(`Schema version: ${response.version}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema or subject not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to look up schema version: ${err.message}`);
    }
  }
}

module.exports = { lookupVersion };
// [END managedkafka_v1_managedschemaregistry_lookup_version]
