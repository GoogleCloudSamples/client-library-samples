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

// [START bigquerystorage_v1_bigquerywrite_writestream_get]
const {BigQueryWriteClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryWriteClient();

/**
 * Gets information about a single write stream.
 *
 * @param {string} projectId The project ID of the table. e.g. 'my-project'
 * @param {string} datasetId The dataset ID of the table. e.g. 'my_dataset'
 * @param {string} tableId The ID of the table. e.g. 'my_table'
 */
async function getWriteStream(projectId, datasetId, tableId) {

  const streamId = "_default";
  const name = client.writeStreamPath(projectId, datasetId, tableId, streamId);

  const request = {
    name,
  };

  try {
    const [response] = await client.getWriteStream(request);

    console.log(`Got write stream: ${response.name}`);
    console.log(`Stream type: ${response.type}`);
    console.log(`Stream location: ${response.location}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Write stream ${name} not found.`);
    } else {
      console.error('Error getting write stream:', err);
    }
  }
}
// [END bigquerystorage_v1_bigquerywrite_writestream_get]

module.exports = {getWriteStream}
