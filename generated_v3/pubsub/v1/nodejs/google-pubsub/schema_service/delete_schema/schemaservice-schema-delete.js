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

// [START pubsub_v1_schemaservice_schema_delete]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Use the deleteSchema method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} schemaId - ID of the Schema (for example, 'example-schema-id')
 */
async function deleteSchema(projectId, schemaId) {
  try {
    // Format the resource name from project and schema identifiers
    const name = client.schemaPath(projectId, schemaId);

    const request = {
      name,
    };

    await client.deleteSchema(request);
    console.log(`Deleted schema: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema not found: ${projectId}/${schemaId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for schema: ${projectId}/${schemaId}`);
    } else {
      console.error(`Failed to delete schema: ${err.message}`);
    }
  }
}

module.exports = { deleteSchema };
// [END pubsub_v1_schemaservice_schema_delete]
