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

// [START apikeys_v2_apikeys_key_create]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Use the createKey method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location for the API key resource. Only 'global' is supported.
 * @param {string} keyId - The user-specified ID to assign to the key. Must be unique within the project, conform to RFC-1034, use only lowercase letters, digits, and hyphens, start with a letter, and not be a UUID.
 */
async function createKey(projectId, locationId, keyId) {
  try {
    const key = {
      displayName: 'Example API Key',
    };
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [operation] = await client.createKey({
      parent,
      key,
      keyId,
    });

    const [response] = await operation.promise();
    console.log(`Created key: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Key ${keyId} already exists:`, err.message);
    } else {
      console.error('Failed to create key:', err.message);
      throw err;
    }
  }
}

module.exports = { createKey };
// [END apikeys_v2_apikeys_key_create]
