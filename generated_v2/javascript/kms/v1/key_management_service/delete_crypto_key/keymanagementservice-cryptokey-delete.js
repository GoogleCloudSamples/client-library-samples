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

// [START cloudkms_v1_keymanagementservice_cryptokey_delete]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Permanently deletes a CryptoKey.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location ID (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier of the KeyRing containing the CryptoKey.
 * @param {string} cryptoKeyId - The caller-chosen identifier of the CryptoKey to delete.
 */
async function deleteCryptoKey(projectId, locationId, keyRingId, cryptoKeyId) {
  try {
    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId
    );

    // Initiates the long-running operation to permanently delete the CryptoKey.
    const [operation] = await client.deleteCryptoKey({
      name,
    });

    // Waits for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Deleted CryptoKey: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKey not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Cloud KMS API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteCryptoKey };
// [END cloudkms_v1_keymanagementservice_cryptokey_delete]
