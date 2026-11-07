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

// [START oslogin_v1beta_osloginservice_posixaccount_delete]
'use strict';

const {OsLoginServiceClient} = require('@google-cloud/os-login').v1beta;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a POSIX account from an OS Login profile.
 *
 * @param {string} userId - ID of the User (for example, 'example-user-id')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function deletePosixAccount(userId, projectId) {
  // Instantiates the OS Login v1beta client
  const client = new OsLoginServiceClient();

  try {
    // Construct the resource name for the POSIX account
    const name = client.posixAccountPath(userId, projectId);
    const request = {
      name,
    };

    await client.deletePosixAccount(request);
    console.log(`Deleted POSIX account: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('POSIX account was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when deleting POSIX account.');
    } else {
      console.error(`Failed to delete POSIX account: ${err.message}`);
    }
  }
}

module.exports = {deletePosixAccount};
// [END oslogin_v1beta_osloginservice_posixaccount_delete]
