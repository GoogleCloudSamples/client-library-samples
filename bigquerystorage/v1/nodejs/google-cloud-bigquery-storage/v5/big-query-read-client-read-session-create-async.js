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

const process = require('process');

// [START bigquerystorage_v1_bigqueryread_readsession_create_async]
const {BigQueryReadClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryReadClient();

/**
 * Creates a new read session for a BigQuery table.
 *
 * A read session divides the contents of a BigQuery table into one or more
 * streams, which can then be used to read data from the table. The read
 * session also specifies properties of the data to be read, such as a list
 * of columns or a push-down filter describing the rows to be returned.
 *
 * @param {string} projectId Google Cloud Project ID. Example: 'your-project-id'
 * @param {string} datasetId BigQuery Dataset ID. Example: 'your-dataset-id'
 * @param {string} tableId BigQuery Table ID. Example: 'your-table-id'
 */
async function createReadSession(
  projectId,
  datasetId = 'your-dataset-id',
  tableId = 'your-table-id'
) {
  const table = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

  const parent = `projects/${projectId}`;

  const maxStreamCount = 10;

  const request = {
    parent,
    readSession: {
      table,
      // The data format of the output data. AVRO is a common and widely supported format.
      // Other options include 'ARROW'. 'DATA_FORMAT_UNSPECIFIED' is not supported.
      dataFormat: 'AVRO',
    },
    // Max initial number of streams. If unset or zero, the server will provide a value
    // so as to produce reasonable throughput. The number of streams may be lower
    // than the requested number, depending on the parallelism reasonable for the table.
    // There is a default system max limit of 1,000.
    maxStreamCount,
  };

  try {
    const [readSession] = await client.createReadSession(request);
    console.log(readSession.name);
    console.log(`	Estimated row count: ${readSession.estimatedRowCount}`);
    console.log(
      `	Estimated total bytes scanned: ${readSession.estimatedTotalBytesScanned}`
    );
    console.log(`	Number of streams: ${readSession.streams.length}`);

    if (readSession.streams && readSession.streams.length > 0) {
      console.log(`	First stream name: ${readSession.streams[0].name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Table '${table}' not found. Please ensure the table exists and you have the necessary permissions.`
      );
    } else {
      console.error(`Error creating read session: ${err.message}`);
    }
  }
}
// [END bigquerystorage_v1_bigqueryread_readsession_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`
    );
  }
  await createReadSession(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - BigQuery Dataset like 'example-dataset-id'
 - BigQuery Table like 'example-table-id'
Usage:
 node big-query-read-client-read-session-create-async.js example-project-id example-dataset-id example-table-id
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createReadSession,
};
