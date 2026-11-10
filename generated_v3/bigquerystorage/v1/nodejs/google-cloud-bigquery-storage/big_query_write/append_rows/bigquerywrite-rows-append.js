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

// [START bigquerystorage_v1_bigquerywrite_append_rows]
'use strict';

const {BigQueryWriteClient, adapt} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');
const protobuf = require('protobufjs');

const client = new BigQueryWriteClient();

/**
 * Use the appendRows method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} datasetId - The BigQuery dataset ID (for example, 'example_dataset').
 * @param {string} tableId - The BigQuery table ID (for example, 'example_table').
 * @param {string} streamId - ID of the write stream (server-generated stream ID from CreateWriteStream, or '_default' for the table's default stream).
 */
async function appendRows(projectId, datasetId, tableId, streamId) {
  try {
    const writeStream = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}/streams/${streamId}`;

    // Define the schema for the serialized rows
    const root = protobuf.Root.fromJSON({
      nested: {
        CustomerRecord: {
          fields: {
            customerName: {
              type: 'string',
              id: 1,
            },
            rowNum: {
              type: 'int64',
              id: 2,
            },
          },
        },
      },
    });

    const CustomerRecord = root.lookupType('CustomerRecord');
    const descriptor = CustomerRecord.toDescriptor('proto2');
    const protoDescriptor = adapt.normalizeDescriptor(descriptor);

    // Serialize sample rows matching the schema
    const row = {
      customerName: 'example-customer',
      rowNum: 1,
    };
    const serializedRow = CustomerRecord.encode(row).finish();

    // Construct the append rows request with schema and rows
    const request = {
      writeStream,
      protoRows: {
        writerSchema: {
          protoDescriptor,
        },
        rows: {
          serializedRows: [serializedRow],
        },
      },
    };

    // Open bidirectional stream and register handlers
    const stream = client.appendRows();

    const appendPromise = new Promise((resolve, reject) => {
      stream.on('data', response => {
        if (response.error) {
          reject(new Error(response.error.message));
          return;
        }
        resolve(response);
      });
      stream.on('error', reject);
    });

    stream.write(request);
    stream.end();

    const response = await appendPromise;
    console.log(`Successfully appended rows to: ${writeStream}`);
    if (response.appendResult && response.appendResult.offset) {
      console.log(`Append result offset: ${response.appendResult.offset}`);
    }
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`BigQuery Storage API error (code ${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { appendRows };
// [END bigquerystorage_v1_bigquerywrite_append_rows]
