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

// [START bigqueryconnection_v1beta1_connectionservice_connection_delete]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the deleteConnection method
 *
 * @param {string} projectId - The Google Cloud project ID containing the connection.
 * @param {string} locationId - The Google Cloud region or multi-region of the connection (for example, 'us' or 'us-central1').
 * @param {string} connectionId - The ID of the connection to delete.
 */
async function deleteConnection(projectId, locationId, connectionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/connections/${connectionId}`;
    const request = {
      name,
    };

    await client.deleteConnection(request);
    console.log(`Deleted connection: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete connection: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteConnection };
// [END bigqueryconnection_v1beta1_connectionservice_connection_delete]
