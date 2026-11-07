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

// [START cloudkms_v1_keymanagementservice_keyring_create]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Creates a new key ring in the specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the key ring (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier of the KeyRing to create. It must be unique within the location and match the regular expression '[a-zA-Z0-9_-]{1,63}' (for example, 'example-key-ring').
 */
async function createKeyRing(projectId, locationId, keyRingId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const keyRing = {};

    const [createdKeyRing] = await client.createKeyRing({
      parent,
      keyRingId,
      keyRing,
    });

    console.log(`Created key ring: ${createdKeyRing.name}`);
    return createdKeyRing;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Key ring already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating key ring: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for key ring creation: ${err.message}`);
    } else {
      console.error(`Failed to create key ring: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createKeyRing };
// [END cloudkms_v1_keymanagementservice_keyring_create]
