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

// [START bigquerystorage_v1beta2_bigquerywrite_append_rows]
'use strict';

const {BigQueryWriteClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

const client = new BigQueryWriteClient();

/**
 * Appends rows to a BigQuery table using the default write stream.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} datasetId - ID of the Dataset (for example, 'example-dataset-id')
 * @param {string} tableId - ID of the Table (for example, 'example-table-id')
 */
async function appendRows(projectId, datasetId, tableId) {
  try {
    const writeStream = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}/_default`;

    const stream = client.appendRows();

    const responsePromise = new Promise((resolve, reject) => {
      stream.on('data', response => {
        if (response.error) {
          reject(response.error);
          return;
        }
        resolve(response);
      });
      stream.on('error', err => {
        reject(err);
      });
    });

    const protoDescriptor = {
      name: 'RowRecord',
      field: [
        {
          name: 'col1',
          number: 1,
          type: 9,
        },
      ],
    };

    const writerSchema = {
      protoDescriptor,
    };

    const rowValue = Buffer.from('example-value');
    const rowBuffer = Buffer.concat([
      Buffer.from([0x0a, rowValue.length]),
      rowValue,
    ]);

    const rows = {
      serializedRows: [rowBuffer],
    };

    const protoRows = {
      writerSchema,
      rows,
    };

    const request = {
      writeStream,
      protoRows,
    };

    stream.write(request);
    stream.end();

    const response = await responsePromise;
    console.log(`Appended rows successfully. Offset: ${response.appendResult?.offset}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument encountered: ${err.message}`);
    } else {
      console.error(`Failed to append rows: ${err.message}`);
    }
  }
}

module.exports = { appendRows };
// [END bigquerystorage_v1beta2_bigquerywrite_append_rows]
