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

// [START cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Use the updateCryptoKeyPrimaryVersion method
 *
 * @param {string} cryptoKeyVersionId - The server-generated ID of the child CryptoKeyVersion to use as primary (for example, '1' or '2').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The identifier of the KeyRing.
 * @param {string} cryptoKeyId - The identifier of the CryptoKey.
 */
async function updateCryptoKeyPrimaryVersion(
  cryptoKeyVersionId,
  projectId,
  locationId,
  keyRingId,
  cryptoKeyId
) {
  try {
    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId
    );

    const [cryptoKey] = await client.updateCryptoKeyPrimaryVersion({
      name,
      cryptoKeyVersionId,
    });

    console.log(`Updated primary version: ${cryptoKey.primary.name}`);
    return cryptoKey;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKey or CryptoKeyVersion not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Key version cannot be set as primary: ${err.message}`);
    } else {
      console.error(`Failed to update primary key version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateCryptoKeyPrimaryVersion };
// [END cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
