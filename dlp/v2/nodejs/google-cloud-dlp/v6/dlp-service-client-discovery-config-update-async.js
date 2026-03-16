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

// [START dlp_v2_dlpservice_discoveryconfig_update_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {protos} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const dlpClient = new DlpServiceClient();

/**
 * Updates an existing DiscoveryConfig.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The Google Cloud location (e.g., 'global', 'us-central1').
 * @param {string} configId The ID of the DiscoveryConfig to update.
 */
async function updateDiscoveryConfig(projectId, locationId, configId) {
  const name = dlpClient.discoveryConfigPath(projectId, locationId, configId);

  const updatedDiscoveryConfig = {
    // Example of changing the status to PAUSED. Use 'RUNNING' to activate it.
    status: protos.google.privacy.dlp.v2.DiscoveryConfig.Status.PAUSED,
  };

  // Only the fields specified in `updateMask` will be modified.
  // For example, to update the status:
  const updateMask = {
    paths: ['status'],
  };

  const request = {
    name,
    discoveryConfig: updatedDiscoveryConfig,
    updateMask,
  };

  try {
    const [response] = await dlpClient.updateDiscoveryConfig(request);
    console.log(`Successfully updated DiscoveryConfig: ${response.name}`);
    console.log(`Updated Status: ${response.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: DiscoveryConfig ${name} not found. Please ensure the config ID and location are correct.`,
      );
    } else {
      console.error('Error updating DiscoveryConfig:', err);
    }
  }
}
// [END dlp_v2_dlpservice_discoveryconfig_update_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await updateDiscoveryConfig(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Discovery Config ID like 'my-config'
Usage:
 node dlp-service-client-discovery-config-update-async.js example-project-168 us-central1 my-config
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateDiscoveryConfig,
};
