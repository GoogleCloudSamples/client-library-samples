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

// [START pubsub_v1_schemaservice_commit_schema]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Commits a new schema revision to an existing Google Cloud Pub/Sub schema.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} schemaId - ID of the Schema (for example, 'example-schema-id')
 */
async function commitSchema(projectId, schemaId) {
  try {
    const name = client.schemaPath(projectId, schemaId);
    const schema = {
      name,
      type: 'AVRO',
      definition: JSON.stringify({
        type: 'record',
        name: 'AvroRecord',
        fields: [
          {
            name: 'status',
            type: 'string',
          },
        ],
      }),
    };

    const request = {
      name,
      schema,
    };

    const [response] = await client.commitSchema(request);

    console.log(`Committed schema: ${response.name}`);
    console.log(`New revision ID: ${response.revisionId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid schema definition or argument: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during schema commit: ${err.message}`);
    } else {
      console.error(`Failed to commit schema: ${err.message}`);
    }
  }
}

module.exports = {commitSchema};
// [END pubsub_v1_schemaservice_commit_schema]
