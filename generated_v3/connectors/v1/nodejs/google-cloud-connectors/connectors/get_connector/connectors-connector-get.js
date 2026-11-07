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

// [START connectors_v1_connectors_connector_get]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Gets details of a connector.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The location identifier (for example, 'global')
 * @param {string} providerId - The provider ID (for example, 'example-provider-id')
 * @param {string} connectorId - The connector ID (for example, 'example-connector-id')
 */
async function getConnector(projectId, locationId, providerId, connectorId) {
  try {
    // Connector catalog resources reside in the 'global' location.
    const location = locationId === 'global' ? locationId : 'global';
    const name = client.connectorPath(
      projectId,
      location,
      providerId,
      connectorId
    );

    const request = {
      name,
    };

    const [connector] = await client.getConnector(request);

    console.log(`Connector name: ${connector.name}`);
    console.log(`Display name: ${connector.displayName}`);
    console.log(`Description: ${connector.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connector not found: ${connectorId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing connector: ${connectorId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to get connector: ${err.message}`);
    }
  }
}

module.exports = { getConnector };
// [END connectors_v1_connectors_connector_get]
