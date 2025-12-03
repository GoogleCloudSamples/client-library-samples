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

// [START bigquerystorage_v1beta1_bigquerystorage_readsession_create]
const {BigQueryStorageClient} =
  require('@google-cloud/bigquery-storage').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BigQueryStorageClient();

/**
 * Creates a new read session for a BigQuery table.
 *
 * @param {string} projectId The project to bill for the read. e.g. 'my-project-id'
 * @param {string} datasetId The dataset containing the table. e.g. 'usa_names'
 * @param {string} tableId The table to read. e.g. 'usa_1910_current'
 */
async function createReadSession(projectId, datasetId, tableId) {
  const readOptions = {
    selectedFields: ['field_01', 'field_02'],
  };

  const request = {
    parent: `projects/${projectId}`,
    tableReference: {
      projectId: projectId,
      datasetId,
      tableId,
    },
    readOptions,
    requestedStreams: 1,
  };

  try {
    const [session] = await client.createReadSession(request);

    console.log(`Read session created: ${session.name}`);
    console.log(`Format: ${session.avroSchema ? 'AVRO' : 'ARROW'}`);
    console.log(`Expected stream count: ${session.streams.length}`);

    if (session.avroSchema && session.avroSchema.schema) {
      const schema = JSON.parse(session.avroSchema.schema);
      console.log(`Schema: ${JSON.stringify(schema, null, 2)}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Could not find table ${tableProjectId}.${datasetId}.${tableId}`,
      );
    } else {
      console.error('Error creating read session:', err);
    }
  }
}
// [END bigquerystorage_v1beta1_bigquerystorage_readsession_create]
