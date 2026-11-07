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

// [START connectors_v1_connectors_connectorversions_list]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Lists connector versions for a specified connector.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'global')
 * @param {string} providerId - ID of the Provider (for example, 'example-provider-id')
 * @param {string} connectorId - ID of the Connector (for example, 'example-connector-id')
 */
async function listConnectorVersions(projectId, locationId, providerId, connectorId) {
  // Connector versions are catalog resources residing exclusively in the 'global' location.
  const parent = `projects/${projectId}/locations/global/providers/${providerId}/connectors/${connectorId}`;

  try {
    const [connectorVersions] = await client.listConnectorVersions({
      parent,
    });

    console.log(`Found ${connectorVersions.length} connector version(s):`);
    for (const version of connectorVersions) {
      console.log(`Connector Version: ${version.name}`);
      console.log(`  Display Name: ${version.displayName}`);
      console.log(`  State: ${version.state}`);
      console.log(`  Launch Stage: ${version.launchStage}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connector not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing: ${parent}`);
    } else {
      console.error(`Failed to list connector versions: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listConnectorVersions };
// [END connectors_v1_connectors_connectorversions_list]
