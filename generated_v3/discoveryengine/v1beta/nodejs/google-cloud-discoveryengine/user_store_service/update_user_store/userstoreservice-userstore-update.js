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

// [START discoveryengine_v1beta_userstoreservice_userstore_update]
'use strict';

const {UserStoreServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new UserStoreServiceClient();

/**
 * Updates a user store.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global').
 * @param {string} userStoreId - The ID of the User Store (for example, 'default_user_store').
 */
async function updateUserStore(projectId, locationId, userStoreId) {
  try {
    const userStore = {
      name: `projects/${projectId}/locations/${locationId}/userStores/${userStoreId}`,
      displayName: 'Updated User Store',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      userStore,
      updateMask,
    };

    const [response] = await client.updateUserStore(request);
    console.log(`Updated user store: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`User store not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateUserStore };
// [END discoveryengine_v1beta_userstoreservice_userstore_update]
