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

// [START cloudkms_v1_keymanagementservice_decrypt]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Decrypts ciphertext using a Cloud KMS CryptoKey.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The identifier of the KeyRing.
 * @param {string} cryptoKeyId - The identifier of the CryptoKey.
 * @param {Buffer|Uint8Array|string} ciphertext - The encrypted ciphertext bytes to decrypt.
 * @returns {Promise<Buffer>} The decrypted plaintext.
 */
async function decrypt(projectId, locationId, keyRingId, cryptoKeyId, ciphertext) {
  try {
    const name = client.cryptoKeyPath(projectId, locationId, keyRingId, cryptoKeyId);

    const [response] = await client.decrypt({
      name,
      ciphertext,
    });

    console.log(`Plaintext: ${response.plaintext.toString('utf8')}`);
    return response.plaintext;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cloud KMS resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Cloud KMS resource: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for decryption: ${err.message}`);
    } else {
      console.error(`Decryption failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { decrypt };
// [END cloudkms_v1_keymanagementservice_decrypt]
