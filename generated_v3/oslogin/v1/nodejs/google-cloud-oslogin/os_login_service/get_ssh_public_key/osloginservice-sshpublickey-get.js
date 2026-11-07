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

// [START oslogin_v1_osloginservice_sshpublickey_get]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Use the getSshPublicKey method
 *
 * @param {string} userId - ID of the User (for example, 'example-user-id')
 * @param {string} fingerprintId - ID of the Fingerprint (for example, 'example-fingerprint-id')
 */
async function getSshPublicKey(userId, fingerprintId) {
  try {
    const name = `users/${userId}/sshPublicKeys/${fingerprintId}`;
    const request = {
      name,
    };

    const [response] = await client.getSshPublicKey(request);
    console.log(`Retrieved SSH public key: ${response.key}`);
    console.log(`Fingerprint: ${response.fingerprint}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`SSH public key not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing SSH public key: ${err.message}`);
    } else {
      console.error(`API error retrieving SSH public key: ${err.message}`);
    }
  }
}

module.exports = { getSshPublicKey };
// [END oslogin_v1_osloginservice_sshpublickey_get]
