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

// [START apikeys_v2_apikeys_key_get]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Use the getKey method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the API key. API keys are global resources; the service requires `global`.
 * @param {string} keyId - The ID or server-generated UID of the API key. Obtain this value from an existing key (for example, from CreateKey or ListKeys).
 */
async function getKey(projectId, locationId, keyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/keys/${keyId}`;

    const request = {
      name,
    };

    const [key] = await client.getKey(request);

    console.log(`Retrieved key: ${key.displayName}`);
    console.log(`Resource name: ${key.name}`);
    return key;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('API key not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for the requested API key.');
    } else {
      console.error(`API request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getKey };
// [END apikeys_v2_apikeys_key_get]
