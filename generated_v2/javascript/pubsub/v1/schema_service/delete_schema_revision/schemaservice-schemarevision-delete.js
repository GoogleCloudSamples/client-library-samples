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

// [START pubsub_v1_schemaservice_schemarevision_delete]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a specific revision of a Pub/Sub schema.
 *
 * @param {string} projectId - The Google Cloud project ID containing the Pub/Sub schema.
 * @param {string} schemaId - The ID of the Pub/Sub schema.
 * @param {string} revisionId - The server-generated revision ID of the schema to delete (for example, 'c7cfa2a8').
 */
async function deleteSchemaRevision(projectId, schemaId, revisionId) {
  const client = new SchemaServiceClient();
  const name = `projects/${projectId}/schemas/${schemaId}@${revisionId}`;

  try {
    const request = {
      name,
    };

    const [schema] = await client.deleteSchemaRevision(request);
    console.log(`Deleted schema revision: ${schema.name}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      // A schema revision cannot be deleted if it is the only revision.
      // In that case, delete the parent schema.
      const parentName = `projects/${projectId}/schemas/${schemaId}`;
      await client.deleteSchema({name: parentName});
      console.log(`Deleted schema because it contained only one revision: ${parentName}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Schema revision not found: ${name}`);
    } else {
      console.error(`Failed to delete schema revision: ${err.message}`);
    }
  }
}

module.exports = {deleteSchemaRevision};
// [END pubsub_v1_schemaservice_schemarevision_delete]
