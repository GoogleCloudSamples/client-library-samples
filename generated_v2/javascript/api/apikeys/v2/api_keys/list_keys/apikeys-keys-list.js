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

// [START apikeys_v2_apikeys_keys_list]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Use the listKeys method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the API keys. Because Key is a global resource, the value must be 'global'.
 */
async function listKeys(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [keys] = await client.listKeys(request);

    for (const key of keys) {
      console.log(`Key name: ${key.name}`);
      console.log(`Display name: ${key.displayName}`);
      console.log(`Key UID: ${key.uid}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied to access resource: ${err.message}`);
    } else {
      console.error(`Failed to list API keys: ${err.message}`);
    }
  }
}

module.exports = { listKeys };
// [END apikeys_v2_apikeys_keys_list]
