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

// [START cloudresourcemanager_v3_tagkeys_tagkey_update]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Updates an existing TagKey resource.
 *
 * @param {string} tagKeyId - The server-generated numeric ID of the TagKey.
 */
async function updateTagKey(tagKeyId) {
  try {
    const tagKey = {
      name: `tagKeys/${tagKeyId}`,
      description: 'Updated description for the tag key',
    };
    const updateMask = {
      paths: ['description'],
    };

    // UpdateTagKey initiates a long-running operation; wait for completion
    const [operation] = await client.updateTagKey({
      tagKey,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated tag key: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag key not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateTagKey };
// [END cloudresourcemanager_v3_tagkeys_tagkey_update]
