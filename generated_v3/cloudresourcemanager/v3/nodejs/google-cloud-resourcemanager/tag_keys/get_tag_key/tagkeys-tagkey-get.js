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

// [START cloudresourcemanager_v3_tagkeys_tagkey_get]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Retrieves an existing TagKey resource by ID.
 *
 * @param {string} tagKeyId - The server-generated numeric ID of the TagKey (for example, '123456789012').
 */
async function getTagKey(tagKeyId) {
  try {
    const name = `tagKeys/${tagKeyId}`;
    const [tagKey] = await client.getTagKey({name});

    console.log(`Retrieved TagKey: ${tagKey.name}`);
    console.log(`Short name: ${tagKey.shortName}`);
    console.log(`Namespaced name: ${tagKey.namespacedName}`);

    return tagKey;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagKey not found: ${tagKeyId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing TagKey: ${tagKeyId}`);
    } else {
      console.error(`Failed to retrieve TagKey: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTagKey };
// [END cloudresourcemanager_v3_tagkeys_tagkey_get]
