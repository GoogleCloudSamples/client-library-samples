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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_get]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Retrieves metadata for an existing CryptoKeyVersion.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier of the KeyRing.
 * @param {string} cryptoKeyId - The caller-chosen identifier of the CryptoKey.
 * @param {string} cryptoKeyVersionId - The server-generated identifier of the CryptoKeyVersion (for example, '1').
 */
async function getCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId) {
  try {
    const name = client.cryptoKeyVersionPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId,
      cryptoKeyVersionId
    );

    const [cryptoKeyVersion] = await client.getCryptoKeyVersion({
      name,
    });

    console.log(`Name: ${cryptoKeyVersion.name}`);
    console.log(`State: ${cryptoKeyVersion.state}`);
    console.log(`Protection level: ${cryptoKeyVersion.protectionLevel}`);
    console.log(`Algorithm: ${cryptoKeyVersion.algorithm}`);

    return cryptoKeyVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKeyVersion not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing CryptoKeyVersion: ${err.message}`);
    } else {
      console.error(`Failed to retrieve CryptoKeyVersion: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCryptoKeyVersion };
// [END cloudkms_v1_keymanagementservice_cryptokeyversion_get]
