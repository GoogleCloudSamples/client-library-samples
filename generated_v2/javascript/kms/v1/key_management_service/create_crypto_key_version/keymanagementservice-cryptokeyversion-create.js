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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_create]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Creates a new CryptoKeyVersion for a specified CryptoKey.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The ID of the KeyRing containing the CryptoKey, matching [a-zA-Z0-9_-]{1,63}.
 * @param {string} cryptoKeyId - The ID of the CryptoKey for which to create a new version, matching [a-zA-Z0-9_-]{1,63}.
 */
async function createCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId) {
  try {
    const parent = client.cryptoKeyPath(projectId, locationId, keyRingId, cryptoKeyId);
    // Cloud KMS derives key material, algorithm, and protection level from the parent CryptoKey template.
    const cryptoKeyVersion = {};

    const [createdVersion] = await client.createCryptoKeyVersion({
      parent,
      cryptoKeyVersion,
    });

    console.log(`Created CryptoKeyVersion: ${createdVersion.name}`);
    console.log(`State: ${createdVersion.state}`);
    return createdVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error creating CryptoKeyVersion: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createCryptoKeyVersion };
// [END cloudkms_v1_keymanagementservice_cryptokeyversion_create]
