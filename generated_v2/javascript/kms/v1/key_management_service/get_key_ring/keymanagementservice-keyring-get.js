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

// [START cloudkms_v1_keymanagementservice_keyring_get]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Use the getKeyRing method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier of the KeyRing. Must match '[a-zA-Z0-9_-]{1,63}'.
 */
async function getKeyRing(projectId, locationId, keyRingId) {
  try {
    // Construct the KeyRing resource name from project, location, and key ring identifiers.
    const name = client.keyRingPath(projectId, locationId, keyRingId);

    const [keyRing] = await client.getKeyRing({
      name,
    });

    console.log(`Key ring: ${keyRing.name}`);
    return keyRing;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Key ring not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing key ring: ${err.message}`);
    } else {
      console.error(`Service error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getKeyRing };
// [END cloudkms_v1_keymanagementservice_keyring_get]
