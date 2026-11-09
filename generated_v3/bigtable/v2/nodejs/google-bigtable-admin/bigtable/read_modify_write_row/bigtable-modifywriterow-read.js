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

// [START bigtable_v2_bigtable_read_modify_write_row]
'use strict';

const {BigtableClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableClient();

/**
 * Use the readModifyWriteRow method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Bigtable instance.
 * @param {string} instanceId - The ID of the Bigtable instance hosting the table.
 * @param {string} tableId - The ID of the Bigtable table containing the row to modify.
 */
async function readModifyWriteRow(projectId, instanceId, tableId) {
  try {
    const rowKey = Buffer.from('example-row-key');
    const rules = [
      {
        familyName: 'example-family',
        columnQualifier: Buffer.from('example-qualifier'),
        appendValue: Buffer.from('example-appended-value'),
      },
    ];
    const tableName = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const request = {
      tableName,
      rowKey,
      rules,
    };

    // Performs atomic read-modify-write mutations on the specified row
    const [response] = await client.readModifyWriteRow(request);
    console.log(`Modified row key: ${response.row.key.toString()}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument specified: ${err.message}`);
    } else {
      console.error(`Failed to modify row: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { readModifyWriteRow };
// [END bigtable_v2_bigtable_read_modify_write_row]
