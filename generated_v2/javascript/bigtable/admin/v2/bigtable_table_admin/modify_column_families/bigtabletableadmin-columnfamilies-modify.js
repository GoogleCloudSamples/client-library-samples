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

// [START bigtable_v2_bigtabletableadmin_modify_column_families]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Modifies column families in a Cloud Bigtable table.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - Bigtable instance ID (for example, 'example-instance-id').
 * @param {string} tableId - Bigtable table ID (for example, 'example-table-id').
 */
async function modifyColumnFamilies(projectId, instanceId, tableId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;
    const modifications = [
      {
        id: 'cf1',
        create: {
          gcRule: {
            maxNumVersions: 1,
          },
        },
      },
    ];

    const [response] = await client.modifyColumnFamilies({
      name,
      modifications,
    });

    console.log(`Modified column families for table: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Column family already exists: ${err.message}`);
    } else {
      console.error(`Failed to modify column families: ${err.message}`);
    }
  }
}

module.exports = { modifyColumnFamilies };
// [END bigtable_v2_bigtabletableadmin_modify_column_families]
