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

// [START spanner_v1_spanner_execute_batch_dml]
'use strict';

const {SpannerClient} = require('@google-cloud/spanner-api');
const {status} = require('@grpc/grpc-js');

const client = new SpannerClient();

/**
 * Use the executeBatchDml method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen ID of the Cloud Spanner instance.
 * @param {string} databaseId - The caller-chosen ID of the Cloud Spanner database.
 * @param {string} sessionId - The server-generated ID of the Spanner session. Obtain this by calling CreateSession.
 */
async function executeBatchDml(projectId, instanceId, databaseId, sessionId) {
  try {
    const transaction = {
      begin: {
        readWrite: {},
      },
    };
    const session = `projects/${projectId}/instances/${instanceId}/databases/${databaseId}/sessions/${sessionId}`;
    const statements = [
      {
        sql: "INSERT INTO Singers (SingerId, FirstName, LastName) VALUES (1, 'Marc', 'Richards')",
      },
      {
        sql: "INSERT INTO Singers (SingerId, FirstName, LastName) VALUES (2, 'Catalina', 'Smith')",
      },
    ];
    const seqno = 1;

    const request = {
      session,
      transaction,
      statements,
      seqno,
    };

    const [response] = await client.executeBatchDml(request);

    console.log(`Batch DML execution status: ${response.status?.code ?? 0}`);
    if (response.resultSets) {
      console.log(`Result sets returned: ${response.resultSets.length}`);
    }
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Cloud Spanner API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { executeBatchDml };
// [END spanner_v1_spanner_execute_batch_dml]
