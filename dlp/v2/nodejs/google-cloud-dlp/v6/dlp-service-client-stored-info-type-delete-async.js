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

// [START dlp_v2_dlpservice_storedinfotype_delete_async]
const { DlpServiceClient } = require('@google-cloud/dlp');
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Deletes a custom stored info type.
 *
 * @param {string} projectId The Google Cloud project ID to use.
 * @param {string} location The Google Cloud location to run the API call. Can be `global`, `us-central1`, etc.
 * @param {string} storedInfoTypeId The ID of the stored info type to delete. For example, `my-custom-info-type`.
 */
async function deleteStoredInfoType(
  projectId,
  location = 'global',
  storedInfoTypeId = 'YOUR_STORED_INFO_TYPE_ID',
) {
  const name = dlp.projectLocationStoredInfoTypePath(
    projectId,
    location,
    storedInfoTypeId,
  );

  const request = {
    name: name,
  };

  try {
    await dlp.deleteStoredInfoType(request);
    console.log(`Successfully deleted stored info type: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Stored info type ${name} not found.`);
    } else {
      console.error(`Error deleting stored info type ${name}:`, err.message);
    }
  }
}
// [END dlp_v2_dlpservice_storedinfotype_delete_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const storedInfoTypeId = args[2];
  await deleteStoredInfoType(projectId, location, storedInfoTypeId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
- Google Cloud Project ID like 'example-project-id'
- Google Cloud Location like 'us-central1'
- Stored Info Type ID like 'my-custom-ssn-info-type'
Usage:
  node dlp-service-client-stored-info-type-delete-async.js example-project-id us-central1 my-custom-ssn-info-type
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteStoredInfoType,
};
