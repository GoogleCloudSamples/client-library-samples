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

// [START bigqueryconnection_v1_connectionservice_connection_update]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the updateConnection method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} connectionId - ID of the Connection (for example, 'example-connection-id')
 */
async function updateConnection(projectId, locationId, connectionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/connections/${connectionId}`;
    const connection = {
      description: 'Updated connection description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      name,
      connection,
      updateMask,
    };

    const [response] = await client.updateConnection(request);
    console.log(`Connection updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Request failed with status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateConnection };
// [END bigqueryconnection_v1_connectionservice_connection_update]
