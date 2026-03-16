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

// [START dlp_v2_dlpservice_discoveryconfig_get_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Retrieves a specified discovery configuration for Sensitive Data Protection.
 *
 * This sample demonstrates how to fetch the details of an existing discovery
 * configuration, which defines how Cloud DLP scans and profiles your data
 * across various Google Cloud resources.
 *
 * @param {string} projectId The Google Cloud Project ID. (e.g., 'example-project-id')
 * @param {string} locationId The Google Cloud location (e.g., 'us-central1' or 'global').
 * @param {string} discoveryConfigId The ID of the discovery configuration to retrieve. (e.g., 'my-discovery-config')
 */
async function getDiscoveryConfig(
  projectId,
  locationId = 'global',
  discoveryConfigId = 'my-discovery-config',
) {
  const name = client.discoveryConfigPath(
    projectId,
    locationId,
    discoveryConfigId,
  );

  const request = {
    name,
  };

  try {
    const [discoveryConfig] = await client.getDiscoveryConfig(request);

    console.log(
      `Successfully retrieved Discovery Config: ${discoveryConfig.name}`,
    );
    console.log(`Display Name: ${discoveryConfig.displayName}`);
    console.log(`Status: ${discoveryConfig.status}`);
    if (discoveryConfig.lastRunTime && discoveryConfig.lastRunTime.toDate) {
      console.log(`Last Run Time: ${discoveryConfig.lastRunTime.toDate()}`);
    } else {
      console.log('Last Run Time: Not available');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Discovery Config ${discoveryConfigId} does not exist in location ${locationId} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the Discovery Config ID and location are correct.',
      );
    } else {
      console.error(`Error getting discovery config: ${err.message}`);
    }
  }
}
// [END dlp_v2_dlpservice_discoveryconfig_get_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  getDiscoveryConfig(args[0], args[1], args[2]);
}
if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
  - Google Cloud Project like 'example-project-168'
  - Google Cloud Location like 'us-central1'
  - Discovery config ID like 'your-discovery-config-id'
Usage:
  node dlp-service-client-discovery-config-get-async.js example-project-168 us-central1 your-discovery-config-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getDiscoveryConfig,
};
