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

// [START discoveryengine_v1_userlicenseservice_userlicenses_list]
'use strict';

const {UserLicenseServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new UserLicenseServiceClient();

/**
 * Use the listUserLicenses method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (typically 'global').
 * @param {string} userStoreId - The UserStore ID (for example, 'default_user_store').
 */
async function listUserLicenses(projectId, locationId, userStoreId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/userStores/${userStoreId}`;
    const request = {
      parent,
    };

    // Retrieve user licenses under the specified parent resource
    const [userLicenses] = await client.listUserLicenses(request);
    console.log(`Retrieved ${userLicenses.length} user license(s):`);
    for (const license of userLicenses) {
      console.log(`- License Name: ${license.name}`);
      console.log(`  User Principal: ${license.userPrincipal}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list user licenses: ${err.message}`);
    }
  }
}

module.exports = { listUserLicenses };
// [END discoveryengine_v1_userlicenseservice_userlicenses_list]
