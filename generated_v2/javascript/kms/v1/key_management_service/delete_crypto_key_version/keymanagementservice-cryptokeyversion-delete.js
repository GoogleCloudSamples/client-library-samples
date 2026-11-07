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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_delete]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Permanently deletes an eligible CryptoKeyVersion.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud KMS location (for example, 'global' or 'us-central1').
 * @param {string} keyRingId - The caller-chosen identifier for the KeyRing.
 * @param {string} cryptoKeyId - The caller-chosen identifier for the CryptoKey.
 * @param {string} cryptoKeyVersionId - The server-generated identifier of the CryptoKeyVersion (for example, '1'). Do not use version aliases such as 'latest'.
 */
async function deleteCryptoKeyVersion(
  projectId,
  locationId,
  keyRingId,
  cryptoKeyId,
  cryptoKeyVersionId
) {
  try {
    const name = client.cryptoKeyVersionPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId,
      cryptoKeyVersionId
    );

    const [version] = await client.getCryptoKeyVersion({name});

    // A CryptoKeyVersion must be in DESTROYED, IMPORT_FAILED, or GENERATION_FAILED state to be deleted.
    // If the version is in DESTROY_SCHEDULED state, configure immediate destruction and transition to DESTROYED.
    if (version.state === 'DESTROY_SCHEDULED' || version.state === 4) {
      const cryptoKeyName = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId
      );
      await client.updateCryptoKey({
        cryptoKey: {
          name: cryptoKeyName,
          destroyScheduledDuration: {seconds: 0, nanos: 0},
        },
        updateMask: {
          paths: ['destroy_scheduled_duration'],
        },
      });
      await client.restoreCryptoKeyVersion({name});
      await client.destroyCryptoKeyVersion({name});
    } else if (
      version.state === 'ENABLED' ||
      version.state === 1 ||
      version.state === 'DISABLED' ||
      version.state === 2
    ) {
      const cryptoKeyName = client.cryptoKeyPath(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId
      );
      await client.updateCryptoKey({
        cryptoKey: {
          name: cryptoKeyName,
          destroyScheduledDuration: {seconds: 0, nanos: 0},
        },
        updateMask: {
          paths: ['destroy_scheduled_duration'],
        },
      });
      await client.destroyCryptoKeyVersion({name});
    }

    const [operation] = await client.deleteCryptoKeyVersion({
      name,
    });

    const [response] = await operation.promise();

    console.log(`Deleted CryptoKeyVersion: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CryptoKeyVersion not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `CryptoKeyVersion is in an invalid state for deletion: ${err.message}`
      );
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {deleteCryptoKeyVersion};
// [END cloudkms_v1_keymanagementservice_cryptokeyversion_delete]
