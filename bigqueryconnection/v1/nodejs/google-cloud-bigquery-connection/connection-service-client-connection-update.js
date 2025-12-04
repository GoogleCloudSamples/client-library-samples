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

// [START bigqueryconnection_v1_connectionservice_connection_update]
// [START bigqueryconnection_connectionservice_connection_update]
const {ConnectionServiceClient} =
  require('@google-cloud/bigquery-connection').v1;
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Updates a BigQuery connection, demonstrating how to update the friendly name and description.
 *
 * @param {string} projectId The Google Cloud project ID. for example, 'example-project-id'
 * @param {string} location The location of the connection. for example, 'us-central1'
 * @param {string} connectionId The ID of the connection to update. for example, 'example-connection-id'
 */
async function updateConnection(projectId, location, connectionId) {
  const name = connectionClient.connectionPath(
    projectId,
    location,
    connectionId,
  );

  const connection = {
    friendlyName: 'Example Updated Connection',
    description: 'A new description for the connection',
  };

  const updateMask = {
    paths: ['friendly_name', 'description'],
  };

  const request = {
    name,
    connection,
    updateMask,
  };

  try {
    const [response] = await connectionClient.updateConnection(request);

    console.log(`Connection updated: ${response.name}`);
    console.log(`  Friendly name: ${response.friendlyName}`);
    console.log(`  Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Connection not found: ${name}`);
    } else {
      console.error(`Error updating connection ${name}:`, err);
    }
  }
}
// [END bigqueryconnection_connectionservice_connection_update]
// [END bigqueryconnection_v1_connectionservice_connection_update]

module.exports = { updateConnection };
