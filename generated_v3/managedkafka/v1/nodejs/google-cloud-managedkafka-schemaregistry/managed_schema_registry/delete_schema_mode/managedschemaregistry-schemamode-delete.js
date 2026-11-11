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

// [START managedkafka_v1_managedschemaregistry_schemamode_delete]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Deletes a subject-level schema mode and resets the subject to inherit the global mode.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the schema registry is located (for example, 'us-central1').
 * @param {string} schemaRegistryId - The ID of the schema registry instance (for example, 'example-schema-registry').
 * @param {string} subjectId - The ID of the subject whose schema mode is deleted (for example, 'example-subject-value').
 */
async function deleteSchemaMode(projectId, locationId, schemaRegistryId, subjectId) {
  try {
    // Deleting the subject-level schema mode resets the subject to inherit the global schema registry mode.
    const name = `projects/${projectId}/locations/${locationId}/schemaRegistries/${schemaRegistryId}/mode/${subjectId}`;

    await client.deleteSchemaMode({name});
    console.log(`Deleted schema mode: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema mode not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to delete schema mode: ${err.message}`);
    }
  }
}

module.exports = { deleteSchemaMode };
// [END managedkafka_v1_managedschemaregistry_schemamode_delete]
