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

// [START cloudkms_v1_keymanagementservice_encrypt]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Use the encrypt method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The identifier of the KeyRing.
 * @param {string} cryptoKeyId - The identifier of the CryptoKey to use for encryption.
 * @param {string} plaintext - The data to encrypt. Must be no larger than 64KiB for software/external keys or 8KiB for HSM keys.
 */
async function encrypt(projectId, locationId, keyRingId, cryptoKeyId, plaintext) {
  try {
    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId
    );

    const [response] = await client.encrypt({
      name,
      plaintext: Buffer.from(plaintext),
    });

    console.log(`Ciphertext: ${response.ciphertext.toString('base64')}`);
    return response.ciphertext;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKey not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Cloud KMS API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { encrypt };
// [END cloudkms_v1_keymanagementservice_encrypt]
