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

// [START dlp_v2_dlpservice_discoveryconfig_create_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Creates a new discovery configuration.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} locationId The Google Cloud location (e.g., 'global').
 * @param {string} configId A unique identifier for the discovery config.
 */
async function createDiscoveryConfig(projectId, locationId, configId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  const discoveryConfig = {
    displayName: 'My Discovery Config',
    status: 'RUNNING',
    inspectTemplates: [
      `projects/${projectId}/locations/us-central1/inspectTemplates/my-inspect-template-id-1`,
    ],
    targets: [
      {
        bigQueryTarget: {
          filter: {
            otherTables: {},
          },
          generationCadence: {
            refreshFrequency: 'MONTHLY',
          },
        },
      },
    ],
  };

  const request = {
    parent,
    discoveryConfig,
    configId,
  };

  try {
    const [response] = await dlp.createDiscoveryConfig(request);
    console.log(
      `Successfully created discovery config: ${response.name} (Display Name: ${response.displayName})`,
    );
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Discovery config ${configId} already exists in location ${locationId} of project ${projectId}.`,
      );
    } else {
      console.error(`Error creating discovery config: ${err.message}`);
    }
  }
}
// [END dlp_v2_dlpservice_discoveryconfig_create_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  createDiscoveryConfig(args[0], args[1], args[2]);
}
if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
  - Google Cloud Project like 'example-project-168'
  - Google Cloud Location like 'us-central1'
  - Discovery config ID like 'your-discovery-config-id'
Usage:
  node dlp-service-client-discovery-config-create-async.js example-project-168 us-central1 your-discovery-config-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createDiscoveryConfig,
};
