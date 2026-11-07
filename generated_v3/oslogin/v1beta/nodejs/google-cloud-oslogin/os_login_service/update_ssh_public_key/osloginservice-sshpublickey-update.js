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

// [START oslogin_v1beta_osloginservice_sshpublickey_update]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Updates an SSH public key for an OS Login profile.
 *
 * @param {string} userId - ID of the User (for example, 'example-user-id')
 * @param {string} fingerprintId - ID of the Fingerprint (for example, 'example-fingerprint-id')
 */
async function updateSshPublicKey(userId, fingerprintId) {
  try {
    const name = client.sshPublicKeyPath(userId, fingerprintId);
    const sshPublicKey = {
      key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... example-user@example-domain.com',
      expirationTimeUsec: '1735689600000000',
    };

    const request = {
      name,
      sshPublicKey,
    };

    const [response] = await client.updateSshPublicKey(request);
    console.log(`Updated SSH public key fingerprint: ${response.fingerprint}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for user: ${userId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating SSH public key for user: ${userId}`);
    } else {
      console.error(`Failed to update SSH public key: ${err.message}`);
    }
  }
}

module.exports = { updateSshPublicKey };
// [END oslogin_v1beta_osloginservice_sshpublickey_update]
