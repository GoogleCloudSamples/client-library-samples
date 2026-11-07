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

// [START discoveryengine_v1beta_userstoreservice_userstore_get]
'use strict';

const {UserStoreServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new UserStoreServiceClient();

/**
 * Retrieves a user store resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} userStoreId - The ID of the User Store (for example, 'default_user_store').
 */
async function getUserStore(projectId, locationId, userStoreId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/userStores/${userStoreId}`;

    const request = {
      name,
    };

    const [userStore] = await client.getUserStore(request);
    console.log(`User store retrieved: ${userStore.name}`);
    return userStore;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested user store does not exist.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when accessing the user store.');
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getUserStore };
// [END discoveryengine_v1beta_userstoreservice_userstore_get]
