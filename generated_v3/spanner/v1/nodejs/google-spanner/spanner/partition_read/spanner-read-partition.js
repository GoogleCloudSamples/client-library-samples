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

// [START spanner_v1_spanner_partition_read]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the partitionRead method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen Cloud Spanner instance ID.
 * @param {string} databaseId - The caller-chosen Cloud Spanner database ID.
 * @param {string} sessionId - The server-generated Cloud Spanner session ID.
 */
async function partitionRead(projectId, instanceId, databaseId, sessionId) {
  try {
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const table = 'Singers';
    const keySet = {
      all: true,
    };
    const transaction = {
      begin: {
        readOnly: {
          strong: true,
        },
      },
    };
    const columns = ['SingerId', 'FirstName', 'LastName'];

    const request = {
      session,
      table,
      keySet,
      transaction,
      columns,
    };

    const [response] = await client.partitionRead(request);
    const partitionCount = response.partitions ? response.partitions.length : 0;
    console.log(`Received ${partitionCount} partitions.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Requested resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Operation failed precondition:', err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { partitionRead };
// [END spanner_v1_spanner_partition_read]
