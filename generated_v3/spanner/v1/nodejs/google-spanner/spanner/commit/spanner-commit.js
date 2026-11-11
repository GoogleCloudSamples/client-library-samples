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

// [START spanner_v1_spanner_commit]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the commit method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The Cloud Spanner instance ID.
 * @param {string} databaseId - The Cloud Spanner database ID.
 * @param {string} sessionId - The server-assigned session ID.
 */
async function commit(projectId, instanceId, databaseId, sessionId) {
  try {
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const singleUseTransaction = {
      readWrite: {},
    };
    const rowValues = {
      values: [
        {stringValue: '1'},
        {stringValue: 'Marc'},
        {stringValue: 'Richards'},
      ],
    };
    const singerTableInsert = {
      table: 'Singers',
      columns: ['SingerId', 'FirstName', 'LastName'],
      values: [rowValues],
    };
    const mutations = [
      {
        insert: singerTableInsert,
      },
    ];

    const request = {
      session,
      singleUseTransaction,
      mutations,
    };

    const [response] = await client.commit(request);

    console.log('Transaction committed successfully.');
    if (response.commitTimestamp) {
      console.log(`Commit timestamp: ${response.commitTimestamp.seconds}.${response.commitTimestamp.nanos}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Session resource not found: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Transaction was aborted: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Row mutation failed because record exists: ${err.message}`);
    } else {
      console.error(`Commit operation failed: ${err.message}`);
    }
  }
}

module.exports = { commit };
// [END spanner_v1_spanner_commit]
