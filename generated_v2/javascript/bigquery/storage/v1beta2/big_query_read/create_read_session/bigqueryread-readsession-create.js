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

// [START bigquerystorage_v1beta2_bigqueryread_readsession_create]
'use strict';

const {BigQueryReadClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryReadClient();

/**
 * Use the createReadSession method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createReadSession(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const readSession = {
      table: `projects/${projectId}/datasets/example_dataset/tables/example_table`,
      dataFormat: 'AVRO',
    };

    const request = {
      parent,
      readSession,
      maxStreamCount: 1,
    };

    const [response] = await client.createReadSession(request);

    console.log(`Read session created: ${response.name}`);
    console.log(`Streams count: ${response.streams ? response.streams.length : 0}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`BigQuery Storage API error: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { createReadSession };
// [END bigquerystorage_v1beta2_bigqueryread_readsession_create]
