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

// [START bigtable_v2_bigtabletableadmin_schemabundle_create]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Creates a schema bundle for a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the existing Bigtable instance (for example, 'example-instance-id').
 * @param {string} tableId - The ID of the existing Bigtable table (for example, 'example-table-id').
 * @param {string} schemaBundleId - The caller-chosen unique identifier for the schema bundle (for example, 'example-schema-bundle').
 */
async function createSchemaBundle(projectId, instanceId, tableId, schemaBundleId) {
  const client = new BigtableTableAdminClient();

  try {
    const parent = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;
    const schemaBundle = {
      avroSchema: {
        jsonSchemas: {
          userSchema: '{"type":"record","name":"User","fields":[{"name":"id","type":"string"}]}',
        },
      },
    };

    const request = {
      parent,
      schemaBundleId,
      schemaBundle,
    };

    const [operation] = await client.createSchemaBundle(request);
    const [response] = await operation.promise();

    console.log(`Created schema bundle: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Schema bundle already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createSchemaBundle };
// [END bigtable_v2_bigtabletableadmin_schemabundle_create]
