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

// [START cloudkms_v1_keymanagementservice_cryptokeyversions_list]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Lists key versions for a specified CryptoKey.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The identifier of the KeyRing (for example, 'example-key-ring').
 * @param {string} cryptoKeyId - The identifier of the CryptoKey (for example, 'example-crypto-key').
 */
async function listCryptoKeyVersions(projectId, locationId, keyRingId, cryptoKeyId) {
  try {
    const parent = client.cryptoKeyPath(projectId, locationId, keyRingId, cryptoKeyId);

    const [versions] = await client.listCryptoKeyVersions({
      parent,
    });

    for (const version of versions) {
      console.log(`CryptoKeyVersion: ${version.name}`);
      console.log(`State: ${version.state}`);
    }

    return versions;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKey not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list CryptoKey versions: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listCryptoKeyVersions };
// [END cloudkms_v1_keymanagementservice_cryptokeyversions_list]
