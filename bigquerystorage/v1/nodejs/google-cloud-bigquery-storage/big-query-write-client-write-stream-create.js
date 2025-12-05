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

// [START bigquerystorage_v1_bigquerywrite_writestream_create]
// [START bigquerystorage_bigquerywrite_writestream_create]
const {
  BigQueryWriteClient,
  managedwriter,
} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryWriteClient();

/**
 * Creates a write stream of PENDING type to a BigQuery table.
 *
 * @param {string} projectId The project ID of the table, e.g. 'my-project-id'.
 * @param {string} datasetId The dataset ID of the table, e.g. 'my_dataset'.
 * @param {string} tableId The ID of the table to create a stream for, e.g. 'my_table'.
 */
async function createWriteStream(projectId, datasetId, tableId) {
  try {
    const parent = client.tablePath(projectId, datasetId, tableId);

    // A PENDING type stream is used for batch loads. The stream is created
    // in a PENDING state and does not become visible until it is committed.
    const writeStream = {
      type: managedwriter.PendingStream,
    };

    const request = {
      parent,
      writeStream,
    };

    const [response] = await client.createWriteStream(request);

    console.log('Created write stream:');
    console.log(`  ${response.name}`);
    console.log('Stream type:');
    console.log(`  ${response.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Table ${tableId} not found in dataset ${datasetId} in project ${projectId}. Please create the table before running the sample.`,
      );
    } else {
      console.error('Error creating write stream:', err);
    }
  }
}
// [END bigquerystorage_bigquerywrite_writestream_create]
// [END bigquerystorage_v1_bigquerywrite_writestream_create]

module.exports = {createWriteStream}
