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

// [START bigqueryconnection_v1_connectionservice_test_iam_permissions]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location/region of the connection (e.g., 'us-central1' or 'US').
 * @param {string} connectionId - The ID of the BigQuery connection.
 */
async function testIamPermissions(projectId, locationId, connectionId) {
  try {
    const permissions = [
      'bigquery.connections.get',
      'bigquery.connections.update',
    ];
    const resource = `projects/${projectId}/locations/${locationId}/connections/${connectionId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);

    console.log(`Tested IAM permissions on resource: ${resource}`);
    console.log(
      `Allowed permissions: ${(response.permissions || []).join(', ')}`
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END bigqueryconnection_v1_connectionservice_test_iam_permissions]
