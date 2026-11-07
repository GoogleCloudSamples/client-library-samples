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

// [START bigquerystorage_v1_bigqueryread_readsession_create]
'use strict';

const {BigQueryReadClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryReadClient();

/**
 * Use the createReadSession method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} datasetId - The BigQuery dataset ID containing the table to read.
 * @param {string} tableId - The BigQuery table ID to read.
 */
async function createReadSession(projectId, datasetId, tableId) {
  try {
    const parent = `projects/${projectId}`;
    const readSession = {
      table: `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
      dataFormat: 'AVRO',
    };

    const [session] = await client.createReadSession({
      parent,
      readSession,
    });

    console.log(`Session created: ${session.name}`);
    console.log(`Streams count: ${session.streams.length}`);
    return session;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing resource: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { createReadSession };
// [END bigquerystorage_v1_bigqueryread_readsession_create]
