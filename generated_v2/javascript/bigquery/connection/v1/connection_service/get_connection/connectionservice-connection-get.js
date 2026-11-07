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

// [START bigqueryconnection_v1_connectionservice_connection_get]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the getConnection method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} connectionId - ID of the Connection (for example, 'example-connection-id')
 */
async function getConnection(projectId, locationId, connectionId) {
  try {
    const name = client.connectionPath(projectId, locationId, connectionId);
    const request = {
      name,
    };

    const [response] = await client.getConnection(request);

    console.log(`Connection ID: ${connectionId}`);
    console.log(`Connection Resource Name: ${response.name}`);
    console.log(`Friendly Name: ${response.friendlyName || 'N/A'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection resource was not found.`);
    } else if (err.code !== undefined) {
      console.error(`Google API Error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getConnection };
// [END bigqueryconnection_v1_connectionservice_connection_get]
