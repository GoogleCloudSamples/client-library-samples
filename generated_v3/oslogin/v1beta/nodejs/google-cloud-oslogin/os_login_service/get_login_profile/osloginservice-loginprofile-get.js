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

// [START oslogin_v1beta_osloginservice_loginprofile_get]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login');
const {status} = require('@grpc/grpc-js');

const client = new OsLoginServiceClient();

/**
 * Retrieves the OS Login profile for a specified user.
 *
 * @param {string} userId - The unique user ID or primary email address of an existing Google account.
 */
async function getLoginProfile(userId) {
  try {
    const name = `users/${userId}`;
    const [loginProfile] = await client.getLoginProfile({name});

    console.log(`Retrieved login profile: ${loginProfile.name}`);
    console.log(`POSIX accounts count: ${loginProfile.posixAccounts ? loginProfile.posixAccounts.length : 0}`);
    return loginProfile;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Login profile not found: users/${userId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving login profile: users/${userId}`);
    } else {
      console.error(`Failed to retrieve login profile: ${err.message}`);
    }
  }
}

module.exports = { getLoginProfile };
// [END oslogin_v1beta_osloginservice_loginprofile_get]
