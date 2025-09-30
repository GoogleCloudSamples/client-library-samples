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

// [START bigquerystorage_v1_bigquerywrite_writestream_get_async]
const {BigQueryWriteClient} = require('@google-cloud/bigquery-storage').v1;
const {status} = require('@grpc/grpc-js');


const client = new BigQueryWriteClient();

/**
 * Gets information about a specific write stream for a BigQuery table.
 *
 * A write stream is a channel for appending data to a BigQuery table. Each table
 * has a special default stream ('_default') that is always available.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} datasetId The ID of the BigQuery dataset.
 * @param {string} tableId The ID of the BigQuery table.
 * @param {string} streamId The ID of the write stream. Use '_default' for the default stream.
 */
async function getWriteStream(
  projectId,
  datasetId = 'your_dataset_id',
  tableId = 'your_table_id',
  streamId = '_default'
) {
  const name = client.writeStreamPath(
    projectId,
    datasetId,
    tableId,
    streamId
  );

  const request = {
    name,
  };

  try {
    const [writeStream] = await client.getWriteStream(request);

    console.log(writeStream.name);
    if (writeStream.createTime && writeStream.createTime.seconds) {
      const createTime = new Date(
        writeStream.createTime.seconds * 1000 +
          (writeStream.createTime.nanos || 0) / 1000000
      );
      console.log(`	Create Time: ${createTime}`);
    }
    if (writeStream.commitTime && writeStream.commitTime.seconds) {
      const commitTime = new Date(
        writeStream.commitTime.seconds * 1000 +
          (writeStream.commitTime.nanos || 0) / 1000000
      );
      console.log(`	Commit Time: ${commitTime}`);
    }
    console.log(`	Type: ${writeStream.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Write stream '${name}' not found. Please ensure the project, dataset, table, and stream IDs are correct.`
      );
    } else {
      console.error(`Error getting write stream '${name}':`, err);
    }
  } finally {
  }
}
// [END bigquerystorage_v1_bigquerywrite_writestream_get_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`This script requires 4 arguments, but received ${args.length}.`);
  }
  await getWriteStream(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
 - Google Cloud Project ID like 'your-project-id'
 - BigQuery Dataset ID like 'your_dataset_id'
 - BigQuery Table ID like 'your_table_id'
 - Write Stream ID like '_default'
Usage:
 node big-query-write-client-write-stream-get-async.js your-project-id your_dataset_id your_table_id _default
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getWriteStream,
};
