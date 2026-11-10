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

// [START apikeys_v2_apikeys_key_delete]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Use the deleteKey method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the API key. API Key is a global resource, so only "global" is supported.
 * @param {string} keyId - The identifier of the API key to delete.
 */
async function deleteKey(projectId, locationId, keyId) {
  try {
    const name = client.keyPath(projectId, locationId, keyId);

    // Initiates the deletion and waits for the long-running operation to complete
    const [operation] = await client.deleteKey({name});
    const [response] = await operation.promise();

    console.log(`Deleted API key: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`API key not found: ${err.message}`);
    } else {
      console.error(`Failed to delete API key: ${err.message}`);
    }
  }
}

module.exports = { deleteKey };
// [END apikeys_v2_apikeys_key_delete]
