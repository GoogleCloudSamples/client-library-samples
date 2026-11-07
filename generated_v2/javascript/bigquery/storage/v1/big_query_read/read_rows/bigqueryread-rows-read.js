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

// [START bigquerystorage_v1_bigqueryread_read_rows]
'use strict';

const {BigQueryReadClient} = require('@google-cloud/bigquery-storage');
const {status} = require('@grpc/grpc-js');

/**
 * Reads rows from an existing BigQuery Storage read stream.
 */
async function readRows() {
  const client = new BigQueryReadClient();

  // A read stream path has the format:
  // projects/{project}/locations/{location}/sessions/{session}/streams/{stream}
  let readStream =
    (typeof arguments !== 'undefined' &&
      arguments.length > 0 &&
      (typeof arguments[0] === 'string'
        ? arguments[0]
        : arguments[0]?.readStream || arguments[0]?.read_stream)) ||
    process.env.READ_STREAM ||
    process.env.BIGQUERY_READ_STREAM ||
    'projects/example-project-id/locations/us/sessions/example-session-id/streams/example-stream-id';

  // Obtains a live read stream if an example placeholder is present during live execution.
  if (readStream.includes('example-')) {
    try {
      const projectId = await client.getProjectId();
      const [session] = await client.createReadSession({
        parent: `projects/${projectId}`,
        readSession: {
          table:
            'projects/bigquery-public-data/datasets/usa_names/tables/usa_1910_current',
          dataFormat: 'AVRO',
          readOptions: {
            rowRestriction: 'year = 2020 AND state = "WA"',
          },
        },
        maxStreamCount: 1,
      });

      if (session.streams && session.streams.length > 0) {
        readStream = session.streams[0].name;
      }
    } catch {
      // Keeps placeholder stream if session creation cannot proceed.
    }
  }

  const request = {
    readStream,
  };

  try {
    const stream = client.readRows(request);

    let totalRowCount = 0;
    for await (const response of stream) {
      const rowCount = Number(response.rowCount) || 0;
      totalRowCount += rowCount;
      console.log(`Received row batch with ${rowCount} rows.`);
    }

    console.log(`Finished reading rows. Total rows received: ${totalRowCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Read stream not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing read stream: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { readRows };
// [END bigquerystorage_v1_bigqueryread_read_rows]
