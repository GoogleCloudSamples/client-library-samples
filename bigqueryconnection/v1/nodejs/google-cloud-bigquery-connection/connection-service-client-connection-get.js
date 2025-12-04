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

// [START bigqueryconnection_v1_connectionservice_connection_get]
// [START bigqueryconnection_connectionservice_connection_get]
const {ConnectionServiceClient} =
  require('@google-cloud/bigquery-connection').v1;
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Gets a specified BigQuery connection.
 *
 * A connection stores metadata about an external data source and credentials to access it.
 *
 * @param {string} projectId - Google Cloud project ID. E.g. 'example-project-id'
 * @param {string} location - The location of the connection. e.g. 'us-central1'
 * @param {string} connectionId - The ID of the connection to retrieve. e.g. 'my_connection'
 */
async function getConnection(projectId, location, connectionId) {
  const name = client.connectionPath(projectId, location, connectionId);

  const request = {
    name,
  };

  try {
    const [connection] = await client.getConnection(request);

    console.log(`Successfully retrieved connection: ${connection.name}`);
    console.log(`  Friendly name: ${connection.friendlyName}`);
    console.log(`  Description: ${connection.description}`);
    console.log(`  Has credential: ${connection.hasCredential}`);

    if (connection.cloudSql) {
      console.log(`  Cloud SQL instance ID: ${connection.cloudSql.instanceId}`);
      console.log(`  Cloud SQL database: ${connection.cloudSql.database}`);
      console.log(`  Cloud SQL type: ${connection.cloudSql.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Connection ${name} not found.`);
    } else {
      console.error(`Error getting connection ${name}:`, err);
    }
  }
}
// [END bigqueryconnection_connectionservice_connection_get]
// [END bigqueryconnection_v1_connectionservice_connection_get]

module.exports = { getConnection };
