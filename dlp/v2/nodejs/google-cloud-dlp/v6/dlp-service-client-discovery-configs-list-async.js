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

// [START dlp_v2_dlpservice_discoveryconfigs_list_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists discovery configurations for a given project and location.
 *
 * This sample demonstrates how to list existing discovery configurations
 * for a specified Google Cloud project and location.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud location (e.g., 'global', 'us-central1').
 */
async function listDiscoveryConfigs(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;
  const request = {
    parent,
  };

  try {
    const [discoveryConfigs] = await client.listDiscoveryConfigs(request);

    if (discoveryConfigs.length === 0) {
      console.log(
        `No discovery configurations found for project ${projectId} in location ${location}.`,
      );
      return;
    }

    console.log('Discovery Configurations:');
    for (const config of discoveryConfigs) {
      console.log(`Name: ${config.name}`);
      console.log(`  Display Name: ${config.displayName || 'N/A'}`);
      console.log(`  Status: ${config.status}`);
      if (config.lastRunTime) {
        const lastRunTime = new Date(
          config.lastRunTime.seconds * 1000 +
            config.lastRunTime.nanos / 1000000,
        );
        console.log(`  Last Run Time: ${lastRunTime}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project or location not found. Please ensure project '${projectId}' and location '${location}' exist and are correctly specified.`,
      );
    } else {
      console.error('Error listing discovery configurations:', err.message);
    }
  }
}
// [END dlp_v2_dlpservice_discoveryconfigs_list_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  listDiscoveryConfigs(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Google Cloud Location like 'us-central1'
Usage:
  node dlp-service-client-discovery-configs-list-async.js example-project-168 us-central1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listDiscoveryConfigs,
};
