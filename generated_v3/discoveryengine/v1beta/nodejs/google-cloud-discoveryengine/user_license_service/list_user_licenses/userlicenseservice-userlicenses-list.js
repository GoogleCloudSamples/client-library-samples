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

// [START discoveryengine_v1beta_userlicenseservice_userlicenses_list]
'use strict';

const {UserLicenseServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new UserLicenseServiceClient();

/**
 * Lists user licenses in a UserStore.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global').
 * @param {string} userStoreId - ID of the UserStore (for example, 'default_user_store').
 */
async function listUserLicenses(projectId, locationId, userStoreId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/userStores/${userStoreId}`;

    const request = {
      parent,
    };

    const [userLicenses] = await client.listUserLicenses(request);

    console.log(`Listed ${userLicenses.length} user license(s).`);
    for (const license of userLicenses) {
      console.log(`User License: ${license.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`User store not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listUserLicenses };
// [END discoveryengine_v1beta_userlicenseservice_userlicenses_list]
