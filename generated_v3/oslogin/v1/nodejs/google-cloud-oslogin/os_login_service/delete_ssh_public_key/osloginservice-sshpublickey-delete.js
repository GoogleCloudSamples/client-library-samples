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

// [START oslogin_v1_osloginservice_sshpublickey_delete]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Deletes an SSH public key from a user account.
 *
 * @param {string} userId - ID of the User (for example, 'example-user-id')
 * @param {string} fingerprintId - ID of the Fingerprint (for example, 'example-fingerprint-id')
 */
async function deleteSshPublicKey(userId, fingerprintId) {
  try {
    const name = client.sshPublicKeyPath(userId, fingerprintId);
    const request = {
      name,
    };

    await client.deleteSshPublicKey(request);
    console.log(`Deleted SSH public key: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`SSH public key not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting SSH public key: ${err.message}`);
    } else {
      console.error(`Failed to delete SSH public key: ${err.message}`);
    }
  }
}

module.exports = { deleteSshPublicKey };
// [END oslogin_v1_osloginservice_sshpublickey_delete]
