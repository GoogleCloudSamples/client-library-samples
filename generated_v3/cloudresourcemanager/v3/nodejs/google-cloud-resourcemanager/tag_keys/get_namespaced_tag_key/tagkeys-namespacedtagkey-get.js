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

// [START cloudresourcemanager_v3_tagkeys_namespacedtagkey_get]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Use the getNamespacedTagKey method
 *
 * @param {string} parentId - The organization ID (numeric string, for example, '123456789012') or project ID (for example, 'example-project-id') hosting the TagKey.
 * @param {string} tagKeyShortId - The user-assigned short name of the TagKey (for example, 'env'). Must match an existing TagKey under the parent.
 */
async function getNamespacedTagKey(parentId, tagKeyShortId) {
  try {
    // Construct the namespaced name using the parent resource identifier and TagKey short name.
    const name = `${parentId}/${tagKeyShortId}`;

    const request = {
      name,
    };

    const [tagKey] = await client.getNamespacedTagKey(request);

    console.log(`TagKey name: ${tagKey.name}`);
    console.log(`Namespaced name: ${tagKey.namespacedName}`);
    console.log(`Short name: ${tagKey.shortName}`);

    return tagKey;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagKey not found for name: ${parentId}/${tagKeyShortId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing TagKey: ${parentId}/${tagKeyShortId}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getNamespacedTagKey };
// [END cloudresourcemanager_v3_tagkeys_namespacedtagkey_get]
