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

// [START oslogin_v1_osloginservice_import_ssh_public_key]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Imports an SSH public key for an OS Login profile.
 *
 * @param {string} userId - ID of the User (for example, 'example-user-id')
 */
async function importSshPublicKey(userId) {
  try {
    const parent = client.userPath(userId);
    const sshPublicKey = {
      key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCbexamplePublicKeyString example-user@example.com',
    };

    const request = {
      parent,
      sshPublicKey,
    };

    const [response] = await client.importSshPublicKey(request);
    console.log(`Imported SSH public key for: ${response.loginProfile?.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`User not found: ${userId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for SSH public key import.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to import SSH public key.');
    } else if (err.code) {
      console.error(`API error (status ${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { importSshPublicKey };
// [END oslogin_v1_osloginservice_import_ssh_public_key]
