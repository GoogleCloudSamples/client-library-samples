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

// [START cloudkms_v1_keymanagementservice_importjob_create]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Creates a new ImportJob in the specified KeyRing.
 *
 * @param {string} importJobId - Unique identifier for the ImportJob matching '[a-zA-Z0-9_-]{1,63}'.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The ID of the existing KeyRing.
 */
async function createImportJob(importJobId, projectId, locationId, keyRingId) {
  try {
    const parent = client.keyRingPath(projectId, locationId, keyRingId);
    const importJob = {
      importMethod: 'RSA_OAEP_3072_SHA256_AES_256',
      protectionLevel: 'HSM',
    };

    const [response] = await client.createImportJob({
      parent,
      importJobId,
      importJob,
    });

    console.log(`Created import job: ${response.name}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Import job already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create import job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createImportJob };
// [END cloudkms_v1_keymanagementservice_importjob_create]
