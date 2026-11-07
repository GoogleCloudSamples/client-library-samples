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

// [START cloudkms_v1_keymanagementservice_cryptokeys_list]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Lists CryptoKeys in a given KeyRing.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the KeyRing is located (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen ID of the KeyRing (for example, 'example-key-ring').
 */
async function listCryptoKeys(projectId, locationId, keyRingId) {
  const parent = client.keyRingPath(projectId, locationId, keyRingId);

  try {
    const [cryptoKeys] = await client.listCryptoKeys({
      parent,
    });

    for (const cryptoKey of cryptoKeys) {
      console.log(`CryptoKey: ${cryptoKey.name}`);
      console.log(`  Purpose: ${cryptoKey.purpose}`);
      console.log(`  Algorithm: ${cryptoKey.versionTemplate?.algorithm}`);
    }

    return cryptoKeys;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource: ${parent}`);
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listCryptoKeys };
// [END cloudkms_v1_keymanagementservice_cryptokeys_list]
