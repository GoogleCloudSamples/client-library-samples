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

// [START managedkafka_v1_managedschemaregistry_version_delete]
'use strict';

const {ManagedSchemaRegistryClient} = require('@google-cloud/managedkafka-schemaregistry');
const {status} = require('@grpc/grpc-js');

const client = new ManagedSchemaRegistryClient();

/**
 * Use the deleteVersion method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} schemaRegistryId - ID of the SchemaRegistry (for example, 'example-schemaregistry-id')
 * @param {string} subjectId - ID of the schema subject (for example, 'example-subject-id').
 * @param {string} versionId - The version ID of the subject to delete (for example, '1'). Version aliases such as 'latest' are forbidden.
 */
async function deleteVersion(projectId, locationId, schemaRegistryId, subjectId, versionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/schemaRegistries/${schemaRegistryId}/subjects/${subjectId}/versions/${versionId}`;

    const request = {
      name,
    };

    await client.deleteVersion(request);
    console.log(`Deleted schema version: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema version not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteVersion };
// [END managedkafka_v1_managedschemaregistry_version_delete]
