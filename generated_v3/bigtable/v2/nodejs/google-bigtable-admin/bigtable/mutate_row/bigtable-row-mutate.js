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

// [START bigtable_v2_bigtable_mutate_row]
'use strict';

const {BigtableClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableClient();

/**
 * Mutates a row within a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Bigtable instance.
 * @param {string} instanceId - The ID of the Bigtable instance.
 * @param {string} tableId - The ID of the Bigtable table to mutate.
 * @param {string|Buffer} rowKey - The key of the row to which the mutation should be applied.
 */
async function mutateRow(projectId, instanceId, tableId, rowKey) {
  try {
    const tableName = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const setCellMutation = {
      familyName: 'cf1',
      columnQualifier: Buffer.from('greeting'),
      timestampMicros: -1,
      value: Buffer.from('Hello World!'),
    };

    const mutations = [
      {
        setCell: setCellMutation,
      },
    ];

    const request = {
      tableName,
      rowKey: Buffer.isBuffer(rowKey) ? rowKey : Buffer.from(rowKey),
      mutations,
    };

    await client.mutateRow(request);
    console.log(`Successfully applied mutations to row '${rowKey}'.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Bigtable API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {mutateRow};
// [END bigtable_v2_bigtable_mutate_row]
