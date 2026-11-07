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

// [START pubsub_v1_schemaservice_schemas_list]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Use the listSchemas method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listSchemas(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [schemas] = await client.listSchemas(request);

    console.log(`Listed schemas for project ${projectId}:`);
    for (const schema of schemas) {
      console.log(`Schema name: ${schema.name}`);
      console.log(`Schema type: ${schema.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listSchemas };
// [END pubsub_v1_schemaservice_schemas_list]
