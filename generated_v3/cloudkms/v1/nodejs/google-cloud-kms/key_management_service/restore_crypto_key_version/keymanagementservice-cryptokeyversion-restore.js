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

// [START cloudkms_v1_keymanagementservice_restore_crypto_key_version]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Restores a CryptoKeyVersion in the DESTROY_SCHEDULED state.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-specified identifier of the KeyRing.
 * @param {string} cryptoKeyId - The caller-specified identifier of the CryptoKey.
 * @param {string} cryptoKeyVersionId - The server-generated sequential ID of the CryptoKeyVersion to restore (for example, '1').
 */
async function restoreCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId) {
  try {
    const name = client.cryptoKeyVersionPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId,
      cryptoKeyVersionId
    );

    const [restoredVersion] = await client.restoreCryptoKeyVersion({
      name,
    });

    console.log(`Restored key version: ${restoredVersion.name}`);
    console.log(`Current state: ${restoredVersion.state}`);
    return restoredVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKeyVersion not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`CryptoKeyVersion cannot be restored: ${err.message}`);
    } else {
      console.error(`RPC failed with status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { restoreCryptoKeyVersion };
// [END cloudkms_v1_keymanagementservice_restore_crypto_key_version]
