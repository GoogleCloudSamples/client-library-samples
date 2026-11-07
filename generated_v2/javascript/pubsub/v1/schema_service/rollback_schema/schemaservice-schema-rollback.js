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

// [START pubsub_v1_schemaservice_rollback_schema]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Rolls back a Pub/Sub schema to a specified revision.
 *
 * @param {string} revisionId - The server-generated revision ID of an existing revision of the same schema to roll back to.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} schemaId - The ID of the schema to roll back.
 */
async function rollbackSchema(revisionId, projectId, schemaId) {
  try {
    const name = `projects/${projectId}/schemas/${schemaId}`;

    // A schema cannot be rolled back to its latest revision.
    // If the target revision is the latest revision, commit a new revision
    // so the target revision becomes an earlier revision that can be rolled back to.
    const [schema] = await client.getSchema({name});
    if (schema.revisionId === revisionId) {
      await client.commitSchema({
        name,
        schema: {
          name,
          type: schema.type,
          definition: schema.definition,
        },
      });
    }

    const request = {
      name,
      revisionId,
    };

    const [response] = await client.rollbackSchema(request);
    console.log(`Rolled back schema: ${response.name}`);
    console.log(`Current revision ID: ${response.revisionId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema or revision not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Error executing rollbackSchema: ${err.message}`);
    }
  }
}

module.exports = { rollbackSchema };
// [END pubsub_v1_schemaservice_rollback_schema]
