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

const process = require('process');

// [START dlp_v2_dlpservice_storedinfotype_create_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Creates a custom stored info type.
 *
 * A stored info type is a reusable configuration that defines a custom sensitive
 * information detector based on a regular expression, a dictionary, or a combination.
 * This sample demonstrates creating one using a regular expression.
 *
 * @param {string} projectId The Google Cloud project ID to use.
 * @param {string} locationId The GCP location of the resource (e.g., 'global', 'us-central1').
 * @param {string} storedInfoTypeId The ID of the stored info type to create.
 */
async function createStoredInfoType(
  projectId,
  locationId = 'global',
  storedInfoTypeId = 'my-custom-ssn-info-type',
) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  // Configuration for the stored info type
  const config = {
    displayName: `Custom Social Security Number (${storedInfoTypeId})`,
    description: 'A custom info type for US Social Security Numbers (SSN).',
    // Define the custom info type using a regular expression.
    // Here, we use a regex for a common US Social Security Number format.
    regex: {
      pattern: '\\d{3}-\\d{2}-\\d{4}',
    },
  };

  const request = {
    parent: parent,
    config: config,
    // The storedInfoTypeId is optional. If not provided, the system will generate one.
    // It must be unique within the parent resource.
    storedInfoTypeId: storedInfoTypeId,
  };

  try {
    // Create the stored info type. This is a long-running operation.
    // The API returns an Operation object, which can be used to monitor the creation process.
    const [response] = await dlp.createStoredInfoType(request);
    console.log(`Successfully created stored info type: ${response.name}`);
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Stored info type '${storedInfoTypeId}' already exists in '${parent}'.`,
      );
    } else {
      console.error(
        `Error creating stored info type '${storedInfoTypeId}': ${err.message}`,
      );
    }
  }
}
// [END dlp_v2_dlpservice_storedinfotype_create_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const locationId = args[1];
  const storedInfoTypeId = args[2];
  await createStoredInfoType(projectId, locationId, storedInfoTypeId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
- Google Cloud Project ID like 'example-project-id'
- Google Cloud Location like 'us-central1'
- Stored Info Type ID like 'my-custom-ssn-info-type'
Usage:
  node dlp-service-client-stored-info-type-create-async.js example-project-id us-central1 my-custom-ssn-info-type
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createStoredInfoType,
};
