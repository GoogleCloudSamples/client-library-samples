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

// [START cloudkms_v1_keymanagementservice_importjob_get]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Retrieves metadata for an existing ImportJob.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen ID of the KeyRing.
 * @param {string} importJobId - The caller-chosen ID of the ImportJob.
 */
async function getImportJob(projectId, locationId, keyRingId, importJobId) {
  try {
    // Construct the ImportJob resource path
    const name = client.importJobPath(
      projectId,
      locationId,
      keyRingId,
      importJobId
    );

    const [importJob] = await client.getImportJob({name});

    console.log(`Import job: ${importJob.name}`);
    console.log(`State: ${importJob.state}`);
    console.log(`Import method: ${importJob.importMethod}`);
    console.log(`Protection level: ${importJob.protectionLevel}`);

    return importJob;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Import job not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing import job: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getImportJob };
// [END cloudkms_v1_keymanagementservice_importjob_get]
