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

// [START bigtable_v2_bigtabletableadmin_table_create]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Creates a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance in which to create the table.
 * @param {string} tableId - The caller-chosen ID of the new table within the parent instance, maximum 50 characters (for example, 'example-table').
 */
async function createTable(projectId, instanceId, tableId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const table = {
      granularity: 'MILLIS',
      columnFamilies: {
        cf1: {},
      },
    };

    const request = {
      parent,
      tableId,
      table,
    };

    const [response] = await client.createTable(request);
    console.log(`Created table: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Table ${tableId} already exists in instance ${instanceId}.`);
    } else {
      console.error(`Error creating table: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createTable };
// [END bigtable_v2_bigtabletableadmin_table_create]
