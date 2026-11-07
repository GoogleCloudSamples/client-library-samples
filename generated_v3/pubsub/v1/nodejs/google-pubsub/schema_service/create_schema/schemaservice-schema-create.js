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

// [START pubsub_v1_schemaservice_schema_create]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Creates an Avro schema in a specified Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createSchema(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const schemaId = 'example-schema-id';
    const schema = {
      type: 'AVRO',
      definition: JSON.stringify({
        type: 'record',
        name: 'ExampleRecord',
        fields: [
          {
            name: 'message',
            type: 'string',
          },
        ],
      }),
    };

    const request = {
      parent,
      schema,
      schemaId,
    };

    const [response] = await client.createSchema(request);
    console.log(`Created schema: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Schema already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error creating schema: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { createSchema };
// [END pubsub_v1_schemaservice_schema_create]
