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

// [START oslogin_v1_osloginservice_loginprofile_get]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Use the getLoginProfile method
 *
 * @param {string} userId - The unique ID for the user, such as the user's primary email address or numeric Cloud Identity ID.
 */
async function getLoginProfile(userId) {
  try {
    const name = `users/${userId}`;

    const request = {
      name,
    };

    const [loginProfile] = await client.getLoginProfile(request);

    console.log(`Login profile retrieved for: ${loginProfile.name}`);
    for (const posixAccount of loginProfile.posixAccounts || []) {
      console.log(`- Username: ${posixAccount.username}, UID: ${posixAccount.uid}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Login profile not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to retrieve login profile: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getLoginProfile };
// [END oslogin_v1_osloginservice_loginprofile_get]
