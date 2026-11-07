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

// [START discoveryengine_v1beta_identitymappingstoreservice_identitymappingstore_create]
'use strict';

const {IdentityMappingStoreServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new IdentityMappingStoreServiceClient();

/**
 * Use the createIdentityMappingStore method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} identityMappingStoreId - The caller-chosen ID to assign to the Identity Mapping Store. Must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-), with a maximum length of 63 characters.
 */
async function createIdentityMappingStore(projectId, locationId, identityMappingStoreId) {
  try {
    const identityMappingStore = {};
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
      identityMappingStore,
      identityMappingStoreId,
    };

    const [response] = await client.createIdentityMappingStore(request);
    console.log(`Identity mapping store created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Identity mapping store already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create identity mapping store: ${err.message}`);
    }
  }
}

module.exports = { createIdentityMappingStore };
// [END discoveryengine_v1beta_identitymappingstoreservice_identitymappingstore_create]
