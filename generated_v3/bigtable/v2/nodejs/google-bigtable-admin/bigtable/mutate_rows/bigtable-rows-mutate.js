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

// [START bigtable_v2_bigtable_mutate_rows]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

const {BigtableClient} = v2;
const bigtableClient = new BigtableClient();

/**
 * Mutates rows in a Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance.
 * @param {string} tableId - The ID of the Bigtable table.
 */
async function mutateRows(projectId, instanceId, tableId) {
  try {
    const tableName = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const mutation = {
      setCell: {
        familyName: 'example-family',
        columnQualifier: Buffer.from('example-qualifier'),
        timestampMicros: Date.now() * 1000,
        value: Buffer.from('example-value'),
      },
    };

    const entries = [
      {
        rowKey: Buffer.from('example-row-1'),
        mutations: [mutation],
      },
    ];

    const request = {
      tableName,
      entries,
    };

    const stream = bigtableClient.mutateRows(request);

    for await (const response of stream) {
      for (const entry of response.entries) {
        if (entry.status && entry.status.code !== status.OK) {
          console.error(
            `Mutation error for index ${entry.index} with code ${entry.status.code}: ${entry.status.message}`
          );
        } else {
          console.log(`Successfully mutated row at index: ${entry.index}`);
        }
      }
    }
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Bigtable API error (code: ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {mutateRows};
// [END bigtable_v2_bigtable_mutate_rows]
