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

// [START discoveryengine_v1beta_identitymappingstoreservice_identitymappingstores_list]
'use strict';

const {IdentityMappingStoreServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new IdentityMappingStoreServiceClient();

/**
 * Lists identity mapping stores in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 */
async function listIdentityMappingStores(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [stores] = await client.listIdentityMappingStores(request);
    for (const store of stores) {
      console.log(`Identity mapping store: ${store.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listIdentityMappingStores };
// [END discoveryengine_v1beta_identitymappingstoreservice_identitymappingstores_list]
