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

// [START apigeeconnect_v1_connectionservice_connections_list]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/apigee-connect');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Use the listConnections method
 *
 * @param {string} projectNumberOrProjectId - ID of the ProjectNumberOrProject (for example, 'example-projectnumberorproject-id')
 * @param {string} endpointId - ID of the Endpoint (for example, 'example-endpoint-id')
 */
async function listConnections(projectNumberOrProjectId, endpointId) {
  try {
    const parent = `projects/${projectNumberOrProjectId}/endpoints/${endpointId}`;
    const request = {
      parent,
    };

    const [connections] = await client.listConnections(request);
    console.log(`Connections retrieved: ${connections.length}`);
    for (const connection of connections) {
      console.log(`Endpoint: ${connection.endpoint}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failure: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listConnections };
// [END apigeeconnect_v1_connectionservice_connections_list]
