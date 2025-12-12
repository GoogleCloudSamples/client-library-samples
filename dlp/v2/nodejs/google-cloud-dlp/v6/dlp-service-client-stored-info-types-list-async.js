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

// [START dlp_v2_dlpservice_storedinfotypes_list_async]
const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists all stored info types in a given project and location.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} locationId The Google Cloud location (e.g., 'global', 'us-central1').
 */
async function listStoredInfoTypes(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;
  const request = {
    parent: parent,
  };

  try {
    const [storedInfoTypes] = await client.listStoredInfoTypes(request);

    if (storedInfoTypes.length === 0) {
      console.log(`No stored info types found in ${parent}.`);
      return;
    }

    console.log(`Stored info types found in ${parent}:`);
    for (const storedInfoType of storedInfoTypes) {
      console.log(`Name: ${storedInfoType.name}`);
      // Check if currentVersion and config exist before accessing properties
      if (
        storedInfoType.currentVersion &&
        storedInfoType.currentVersion.config
      ) {
        console.log(
          `\tDisplay Name: ${storedInfoType.currentVersion.config.displayName}`
        );
        console.log(
          `\tDescription: ${storedInfoType.currentVersion.config.description}`
        );
        console.log(`\tState: ${storedInfoType.currentVersion.state}`);
      } else {
        console.log('\tDetails not available for current version.');
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Parent resource ${parent} not found. Please ensure the project ID and location are correct.`
      );
    } else {
      console.error('Error listing stored info types:', err.message);
    }
    // Do not re-throw or exit here, let the calling function handle it.
  }
}
// [END dlp_v2_dlpservice_storedinfotypes_list_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const locationId = args[1];
  listStoredInfoTypes(projectId, locationId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'global'
Usage:
 node dlp-service-client-stored-info-types-list-async.js example-project-168 global
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listStoredInfoTypes,
};
