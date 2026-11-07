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

// [START apikeys_v2_apikeys_key_update]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Updates the display name of an existing API key.
 */
async function updateKey() {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    let keyName = process.env.KEY_NAME;

    if (!keyName && (process.env.KEY_ID || process.env.API_KEY_ID)) {
      const keyId = process.env.KEY_ID || process.env.API_KEY_ID;
      keyName = `projects/${projectId}/locations/${location}/keys/${keyId}`;
    }

    if (!keyName) {
      const [keys] = await client.listKeys({
        parent: `projects/${projectId}/locations/${location}`,
      });
      if (keys && keys.length > 0) {
        keyName = keys[0].name;
      } else {
        const [createOperation] = await client.createKey({
          parent: `projects/${projectId}/locations/${location}`,
          key: {
            displayName: 'Initial API Key',
          },
        });
        const [createdKey] = await createOperation.promise();
        keyName = createdKey.name;
      }
    }

    const key = {
      name: keyName,
      displayName: 'Updated API Key',
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      key,
      updateMask,
    };

    // Update the API key using the long-running operation
    const [operation] = await client.updateKey(request);
    const [response] = await operation.promise();

    console.log(`Updated API key: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`API key not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error updating API key: ${err.message}`);
    }
  }
}

module.exports = {updateKey};
// [END apikeys_v2_apikeys_key_update]
