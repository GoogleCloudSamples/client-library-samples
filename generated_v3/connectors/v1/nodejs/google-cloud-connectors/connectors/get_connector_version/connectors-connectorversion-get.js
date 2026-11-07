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

// [START connectors_v1_connectors_connectorversion_get]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Retrieves a connector version from Google Cloud Connectors.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'global')
 * @param {string} providerId - ID of the provider (for example, 'example-provider-id')
 * @param {string} connectorId - ID of the connector (for example, 'example-connector-id')
 * @param {string} versionId - ID of the connector version (for example, 'example-version-id')
 */
async function getConnectorVersion(projectId, locationId, providerId, connectorId, versionId) {
  try {
    // Connector versions are catalog resources and only exist in the global location.
    const location = locationId === 'global' ? locationId : 'global';
    const name = client.connectorVersionPath(
      projectId,
      location,
      providerId,
      connectorId,
      versionId
    );

    const request = {
      name,
    };

    const [connectorVersion] = await client.getConnectorVersion(request);

    console.log(`Connector Version Name: ${connectorVersion.name}`);
    console.log(`Display Name: ${connectorVersion.displayName}`);
    return connectorVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connector version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to retrieve connector version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getConnectorVersion };
// [END connectors_v1_connectors_connectorversion_get]
