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

// [START oslogin_v1beta_osloginservice_import_ssh_public_key]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Use the importSshPublicKey method
 *
 * @param {string} userId - The unique ID for the user (such as a Google account or Cloud Identity email address).
 */
async function importSshPublicKey(userId) {
  try {
    const sshPublicKey = {
      key: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIExamplePublicKeyForOsLogin user@example.com',
    };
    const parent = `users/${userId}`;

    const request = {
      parent,
      sshPublicKey,
    };

    const [response] = await client.importSshPublicKey(request);
    console.log(`Successfully imported SSH public key for profile: ${response.loginProfile.name}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid key format or user argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`User resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while importing key: ${err.message}`);
    } else {
      console.error(`RPC failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { importSshPublicKey };
// [END oslogin_v1beta_osloginservice_import_ssh_public_key]
