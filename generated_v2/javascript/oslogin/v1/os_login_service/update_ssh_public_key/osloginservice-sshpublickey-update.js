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

// [START oslogin_v1_osloginservice_sshpublickey_update]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Use the updateSshPublicKey method
 *
 * @param {string} userId - The unique ID for the user (such as a Google account email address or numeric ID).
 * @param {string} fingerprintId - The SHA-256 fingerprint identifying the SSH public key.
 */
async function updateSshPublicKey(userId, fingerprintId) {
  try {
    const name = `users/${userId}/sshPublicKeys/${fingerprintId}`;

    // Set expiration to 24 hours in the future
    const oneDayInMicroseconds = 86400000000n;
    const futureTimeUsec = BigInt(Date.now()) * 1000n + oneDayInMicroseconds;

    const sshPublicKey = {
      expirationTimeUsec: futureTimeUsec.toString(),
    };

    const updateMask = {
      paths: ['expiration_time_usec'],
    };

    const request = {
      name,
      sshPublicKey,
      updateMask,
    };

    const [response] = await client.updateSshPublicKey(request);

    console.log(`Updated SSH public key for: ${name}`);
    console.log(`Fingerprint: ${response.fingerprint}`);
    console.log(`Expiration time (usec): ${response.expirationTimeUsec}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target SSH public key not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error updating SSH public key: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateSshPublicKey };
// [END oslogin_v1_osloginservice_sshpublickey_update]
