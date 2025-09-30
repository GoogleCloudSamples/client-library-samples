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

// [START bigquerystorage_v1_bigquerywrite_writestream_create_async]
const bigquery = require('@google-cloud/bigquery-storage');
const {BigQueryWriteClient} = bigquery;
const {status} = require('@grpc/grpc-js');
const bigqueryProtos = bigquery.protos.google.cloud.bigquery.storage.v1;

const client = new BigQueryWriteClient();

/**
 * Creates a new write stream to a specified BigQuery table. This stream can then be used
 * to append data to the table. The example demonstrates creating a 'PENDING' type stream,
 * which requires explicit finalization and batch commitment to make data visible.
 *
 * @param {string} projectId The Google Cloud project ID. (e.g., 'my-project-123')
 * @param {string} datasetId The BigQuery dataset ID. (e.g., 'my_dataset')
 * @param {string} tableId The BigQuery table ID. (e.g., 'my_table')
 * @returns {Promise<string|null>} The name of the created write stream on success, or null on failure.
 */
async function createWriteStream(
  projectId,
  datasetId = 'my_dataset',
  tableId = 'my_table'
) {
  const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

  const writeStream = {
    type: bigqueryProtos.WriteStream.Type.PENDING,
  };

  const request = {
    parent,
    writeStream,
  };

  try {
    const [response] = await client.createWriteStream(request);
    console.log(response.name);
    if (response.createTime && response.createTime.seconds) {
      const createTime = new Date(
        response.createTime.seconds * 1000 +
          (response.createTime.nanos || 0) / 1000000
      );
      console.log(`  Create Time: ${createTime}`);
    }

    const typeEnum = bigqueryProtos.WriteStream.Type;
    let typeString = 'TYPE_UNSPECIFIED';
    for (const key in typeEnum) {
      if (typeEnum[key] === response.type) {
        typeString = typeEnum[key];
        break;
      }
    }
    console.log(`  Type: ${typeString}`);
    return response.name;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The table '${parent}' was not found. Please ensure the project, dataset, and table IDs are correct and the table exists.`
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error: Invalid argument provided. Check the write stream type or table path. Details: ${err.message}`
      );
    } else {
      console.error(`Error creating write stream: ${err.message}`);
    }
    return null;
  }
}
// [END bigquerystorage_v1_bigquerywrite_writestream_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`This script requires 3 arguments, but received ${args.length}.`);
  }
  await createWriteStream(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - BigQuery Dataset ID like 'my_dataset'
 - BigQuery Table ID like 'my_table'
Usage:
 node big-query-write-client-write-stream-create-async.js example-project-168 my_dataset my_table
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createWriteStream,
};
