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

// [START connectors_v1_connectors_connection_create]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Use the createConnection method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} connectionId - ID of the Connection (for example, 'example-connection-id')
 * @param {string} connectorVersionId - Resource name of the ConnectorVersion on which the connection is created, formatted as projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version}.
 */
async function createConnection(projectId, locationId, connectionId, connectorVersionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const connection = {
      connectorVersion: connectorVersionId,
      description: 'Managed connector connection',
    };

    const [operation] = await client.createConnection({
      parent,
      connectionId,
      connection,
    });
    const [response] = await operation.promise();

    console.log(`Connection created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Connection already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createConnection };
// [END connectors_v1_connectors_connection_create]
