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

// [START cloudkms_v1_keymanagementservice_cryptokey_get]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Use the getCryptoKey method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen ID of the KeyRing containing the CryptoKey.
 * @param {string} cryptoKeyId - The caller-chosen ID of the CryptoKey to retrieve.
 */
async function getCryptoKey(projectId, locationId, keyRingId, cryptoKeyId) {
  try {
    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId
    );

    const [cryptoKey] = await client.getCryptoKey({
      name,
    });

    console.log(`CryptoKey name: ${cryptoKey.name}`);
    console.log(`Purpose: ${cryptoKey.purpose}`);
    console.log(`Primary version state: ${cryptoKey.primary?.state}`);

    return cryptoKey;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKey not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing CryptoKey: ${err.message}`);
    } else {
      console.error(`Error retrieving CryptoKey: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCryptoKey };
// [END cloudkms_v1_keymanagementservice_cryptokey_get]
