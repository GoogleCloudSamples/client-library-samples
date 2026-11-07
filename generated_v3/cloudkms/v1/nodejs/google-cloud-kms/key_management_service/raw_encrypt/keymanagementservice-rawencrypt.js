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

// [START cloudkms_v1_keymanagementservice_raw_encrypt]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Use the rawEncrypt method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier of the KeyRing.
 * @param {string} cryptoKeyId - The caller-chosen identifier of the CryptoKey configured with purpose RAW_ENCRYPT_DECRYPT.
 * @param {string} cryptoKeyVersionId - The server-generated identifier or version number of the CryptoKeyVersion (for example, '1').
 * @param {string} plaintext - The data bytes to encrypt. Must be no larger than 64KiB (8KiB for HSM keys).
 */
async function rawEncrypt(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId, plaintext) {
  try {
    const name = client.cryptoKeyVersionPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId,
      cryptoKeyVersionId
    );

    const [response] = await client.rawEncrypt({
      name,
      plaintext: Buffer.from(plaintext),
    });

    console.log(`Ciphertext: ${response.ciphertext.toString('base64')}`);
    if (response.initializationVector) {
      console.log(`Initialization vector: ${response.initializationVector.toString('base64')}`);
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKeyVersion resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`CryptoKeyVersion is not in an enabled state: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Cloud KMS API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { rawEncrypt };
// [END cloudkms_v1_keymanagementservice_raw_encrypt]
