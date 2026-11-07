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

// [START managedkafka_v1_managedschemaregistry_subjectsbyschemaid_list]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Use the listSubjectsBySchemaId method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} schemaRegistryId - The ID of the Schema Registry instance (e.g., 'my-registry'). Must start with a letter, contain only letters, numbers, and underscores, up to 63 characters.
 * @param {string} schemaId - The schema ID (e.g., '100001') of the Schema resource whose associated subjects are to be listed.
 */
async function listSubjectsBySchemaId(projectId, locationId, schemaRegistryId, schemaId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/schemaRegistries/${schemaRegistryId}/schemas/ids/${schemaId}`;
    const [response] = await client.listSubjectsBySchemaId({parent});

    const subjects = Array.isArray(response) ? response : (response.subjects || []);
    console.log(`Found ${subjects.length} subject(s) associated with schema ID ${schemaId}:`);
    for (const subject of subjects) {
      console.log(`- ${subject}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema ID ${schemaId} not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing schema registry: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listSubjectsBySchemaId };
// [END managedkafka_v1_managedschemaregistry_subjectsbyschemaid_list]
