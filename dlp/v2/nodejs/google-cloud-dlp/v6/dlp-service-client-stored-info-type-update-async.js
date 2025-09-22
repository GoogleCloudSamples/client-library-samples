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

// [START dlp_v2_dlpservice_storedinfotype_update_async]
const { DlpServiceClient } = require('@google-cloud/dlp');
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Updates an existing stored info type by creating a new version.
 *
 * This sample demonstrates how to update the display name and description of an
 * existing stored info type. The existing version will continue to be used
 * until the new version is ready.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The GCP location of the stored info type (e.g., 'global', 'us-central1').
 * @param {string} storedInfoTypeId The ID of the stored info type to update.
 */
async function updateStoredInfoType(projectId, location, storedInfoTypeId) {
  const name = dlp.projectLocationStoredInfoTypePath(
    projectId,
    location,
    storedInfoTypeId,
  );

  // New configuration for the stored info type.
  // Only fields specified in the updateMask will be updated.
  const updatedConfig = {
    displayName: 'My Updated Custom Info Type',
    description:
      'This is an updated custom info type for testing the update operation.',
  };

  // Specify which fields of the StoredInfoTypeConfig should be updated.
  // If a field is included in the updateMask but not in updatedConfig, it will be cleared.
  const updateMask = {
    paths: ['display_name', 'description'],
  };

  const request = {
    name: name,
    config: updatedConfig,
    updateMask: updateMask,
  };

  try {
    const [response] = await dlp.updateStoredInfoType(request);
    console.log(`Successfully updated stored info type: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Stored info type '${storedInfoTypeId}' not found in location '${location}' for project '${projectId}'.`,
      );
      console.error(
        'Please ensure the stored info type exists and the project/location are correct.',
      );
    } else {
      console.error('Error updating stored info type:', err.message);
      // Log the full error for debugging purposes in a real application
      // console.error(err);
    }
    process.exitCode = 1;
  }
}
// [END dlp_v2_dlpservice_storedinfotype_update_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const [projectId, location, storedInfoTypeId] = args;
  await updateStoredInfoType(projectId, location, storedInfoTypeId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
- Google Cloud Project ID like 'example-project-id'
- Google Cloud Location like 'us-central1'
- Stored Info Type ID like 'my-custom-ssn-info-type'
Usage:
  node dlp-service-client-stored-info-type-update-async.js example-project-id us-central1 my-custom-ssn-info-type
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateStoredInfoType,
};
