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

// [START dlp_v2_dlpservice_storedinfotype_get_async]
const { status } = require('@grpc/grpc-js');
const { DlpServiceClient } = require('@google-cloud/dlp');

const client = new DlpServiceClient();

/**
 * Gets a stored info type. A stored info type is a custom dictionary or regex
 * that can be used for sensitive data inspection.
 *
 * @param {string} projectId The Google Cloud project ID to use as a parent resource.
 * @param {string} location The Google Cloud region to run the API call in.
 * @param {string} storedInfoTypeId The ID of the stored info type to retrieve.
 */
async function getStoredInfoType(
  projectId,
  location = 'global',
  storedInfoTypeId,
) {
  // Construct request
  const name = client.projectLocationStoredInfoTypePath(
    projectId,
    location,
    storedInfoTypeId,
  );

  const request = {
    name: name,
  };

  try {
    // Send the request and receive the response.
    const [storedInfoType] = await client.getStoredInfoType(request);
    console.log(
      `Successfully retrieved stored info type: ${storedInfoType.name}`,
    );
    console.log(
      `Display Name: ${storedInfoType.currentVersion.config.displayName}`,
    );
    console.log(
      `Description: ${storedInfoType.currentVersion.config.description}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Stored info type ${storedInfoTypeId} not found in ${location} for project ${projectId}.`,
      );
      console.error(
        'Please ensure the stored info type ID and location are correct.',
      );
    } else {
      console.error('Error getting stored info type:', err);
    }
  }
}
// [END dlp_v2_dlpservice_storedinfotype_get_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const [projectId, location, storedInfoTypeId] = args;
  await getStoredInfoType(projectId, location, storedInfoTypeId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
- Google Cloud Project ID like 'example-project-id'
- Google Cloud Location like 'us-central1'
- Stored Info Type ID like 'my-custom-ssn-info-type'
Usage:
  node dlp-service-client-stored-info-type-get-async.js example-project-id us-central1 my-custom-ssn-info-type
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getStoredInfoType,
};
