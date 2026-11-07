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

// [START bigqueryconnection_v1beta1_connectionservice_test_iam_permissions]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Tests permissions on a BigQuery connection.
 */
async function testIamPermissions() {
  try {
    const projectId = await client.getProjectId();
    const resource = `projects/${projectId}/locations/us/connections/example-connection-id`;
    const permissions = 'bigquery.connections.get';

    const request = {
      resource,
      permissions: [permissions],
    };

    const [response] = await client.testIamPermissions(request);
    console.log(
      `Granted permissions: ${
        response.permissions && response.permissions.length > 0
          ? response.permissions.join(', ')
          : 'none'
      }`
    );
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED || err.code === status.NOT_FOUND) {
      console.error(`API error: ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = {testIamPermissions};
// [END bigqueryconnection_v1beta1_connectionservice_test_iam_permissions]
