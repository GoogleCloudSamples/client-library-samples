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

// [START pubsub_v1_schemaservice_validate_message]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Validates a message against a schema definition.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function validateMessage(projectId) {
  try {
    const parent = client.projectPath(projectId);

    const schema = {
      type: 'AVRO',
      definition: JSON.stringify({
        type: 'record',
        name: 'Message',
        fields: [{name: 'message', type: 'string'}],
      }),
    };

    const request = {
      parent,
      schema,
      message: Buffer.from(JSON.stringify({message: 'Hello, world!'})),
      encoding: 'JSON',
    };

    await client.validateMessage(request);
    console.log('Message validated successfully against the schema.');
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid message or schema: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Validation error: ${err.message}`);
    }
  }
}

module.exports = { validateMessage };
// [END pubsub_v1_schemaservice_validate_message]
