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

// [START connectors_v1_connectors_connections_list]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Use the listConnections method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listConnections(projectId, locationId) {
  try {
    // Construct the parent location path from project and location identifiers.
    const parent = `projects/${projectId}/locations/${locationId}`;

    // Retrieve connections configured in the specified project and location.
    const [connections] = await client.listConnections({
      parent,
    });

    console.log('Connections:');
    for (const connection of connections) {
      console.log(`Name: ${connection.name}`);
      console.log(`Connector Version: ${connection.connectorVersion}`);
      console.log(`State: ${connection.state}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when listing connections:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Specified location path was not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      console.error('Execution error:', err);
    }
  }
}

module.exports = { listConnections };
// [END connectors_v1_connectors_connections_list]
