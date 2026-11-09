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

// [START pubsub_v1_schemaservice_validate_schema]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Validates a schema definition against Google Cloud Pub/Sub.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} schemaId - The caller-chosen ID of the schema to validate (for example, 'example-schema-id').
 */
async function validateSchema(projectId, schemaId) {
  try {
    const parent = `projects/${projectId}`;
    const schema = {
      name: `projects/${projectId}/schemas/${schemaId}`,
      type: 'AVRO',
      definition: JSON.stringify({
        type: 'record',
        name: 'SensorReading',
        fields: [
          {name: 'sensorId', type: 'string'},
          {name: 'temperature', type: 'double'},
        ],
      }),
    };

    const request = {
      parent,
      schema,
    };

    const [response] = await client.validateSchema(request);
    console.log(`Validated schema: ${schema.name}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid schema definition: ${err.message}`);
    } else {
      console.error(`API error validating schema: ${err.message}`);
    }
  }
}

module.exports = { validateSchema };
// [END pubsub_v1_schemaservice_validate_schema]
