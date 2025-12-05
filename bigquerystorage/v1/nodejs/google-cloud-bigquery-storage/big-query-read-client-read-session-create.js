// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigquerystorage_v1_bigqueryread_readsession_create]
// [START bigquerystorage_bigqueryread_readsession_create]
const {BigQueryReadClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryReadClient();

/**
 * Creates a read session for a BigQuery table.
 *
 * @param {string} projectId The project ID to use for billing and quota (e.g., 'my-project-id').
 * @param {string} datasetId The ID of the dataset to read from (e.g., 'my_dataset').
 * @param {string} tableId The ID of the table to read from (e.g., 'my_table').
 */
async function createReadSession(
  projectId, datasetId, tableId
) {
  const parent = `projects/${projectId}`;
  const table = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

  const readOptions = {
    selectedFields: ['field_01', 'field_02'],
    rowRestriction: 'field_03 > 100',
  };

  const request = {
    parent,
    readSession: {
      table,
      dataFormat: 'AVRO',
      readOptions,
    },
    maxStreamCount: 1,
  };

  try {
    const [session] = await client.createReadSession(request);

    console.log(`Read session created: ${session.name}`);
    console.log('Session details:');
    console.log(`  Table: ${session.table}`);
    console.log(`  Data format: ${session.dataFormat}`);
    console.log(`  Estimated row count: ${session.estimatedRowCount}`);

    if (session.streams.length > 0) {
      const streamName = session.streams[0].name;
      console.log(`  First stream: ${streamName}`);
    } else {
      console.log('  No streams found in the session.');
    }

    if (session.avroSchema && session.avroSchema.schema) {
      console.log('  AVRO schema:');
      console.log(`  ${session.avroSchema.schema}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Could not find table ${table}. Please ensure the table exists and you have permission to read it.`,
      );
    } else {
      console.error('Error creating read session:', err);
    }
  }
}
// [END bigquerystorage_bigqueryread_readsession_create]
// [END bigquerystorage_v1_bigqueryread_readsession_create]

module.exports = {createReadSession};
