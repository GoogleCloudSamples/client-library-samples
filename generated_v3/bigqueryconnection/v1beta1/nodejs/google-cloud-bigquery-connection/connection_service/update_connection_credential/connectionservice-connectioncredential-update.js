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

// [START bigqueryconnection_v1beta1_connectionservice_connectioncredential_update]
'use strict';

const {v1beta1} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ConnectionServiceClient();

/**
 * Updates the credentials of a BigQuery connection.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or multi-region of the connection (for example, 'us-central1' or 'us').
 * @param {string} connectionId - The identifier of the connection whose credentials are being updated (for example, 'example-connection-id').
 */
async function updateConnectionCredential(projectId, locationId, connectionId) {
  try {
    const credential = {
      cloudSql: {
        username: 'example-db-user',
        password: 'example-password123',
      },
    };
    const name = `projects/${projectId}/locations/${locationId}/connections/${connectionId}/credential`;

    const request = {
      name,
      credential,
    };

    await client.updateConnectionCredential(request);
    console.log(`Successfully updated credential for connection: ${connectionId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection credential not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while updating credential: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateConnectionCredential };
// [END bigqueryconnection_v1beta1_connectionservice_connectioncredential_update]
