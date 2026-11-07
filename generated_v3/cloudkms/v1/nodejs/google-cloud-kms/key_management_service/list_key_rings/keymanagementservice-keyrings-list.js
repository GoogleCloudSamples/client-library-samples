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

// [START cloudkms_v1_keymanagementservice_keyrings_list]
'use strict';

const {KeyManagementServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new KeyManagementServiceClient();

/**
 * Lists Cloud KMS key rings in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location where KeyRings are located (for example, 'global' or 'us-central1').
 */
async function listKeyRings(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const [keyRings] = await client.listKeyRings({
      parent,
    });

    for (const keyRing of keyRings) {
      console.log(`Key ring: ${keyRing.name}`);
    }

    return keyRings;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied listing key rings: ${err.message}`);
    } else {
      console.error(`Failed to list key rings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listKeyRings };
// [END cloudkms_v1_keymanagementservice_keyrings_list]
