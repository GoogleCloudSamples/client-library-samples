// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigqueryconnection_v1_connectionservice_connection_delete]
const {ConnectionServiceClient} =
  require('@google-cloud/bigquery-connection').v1;
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Deletes a connection and its associated credentials.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id').
 * @param {string} location The location where the connection resides (e.g., 'us-central1').
 * @param {string} connectionId The ID of the connection to delete (e.g., 'my-connection').
 */
async function deleteConnection(projectId, location, connectionId) {
  const request = {
    name: client.connectionPath(projectId, location, connectionId),
  };

  try {
    await client.deleteConnection(request);
    console.log(`Connection ${connectionId} deleted successfully.`);
  } catch (error) {
    if (error.code === status.NOT_FOUND) {
      console.log(
        `Connection ${connectionId} does not exist in location ${location} of project ${projectId}.`,
      );
    } else {
      console.error(`Error deleting connection ${connectionId}:`, error);
    }
  }
}
// [END bigqueryconnection_v1_connectionservice_connection_delete]

module.exports = { deleteConnection };
