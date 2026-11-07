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

// [START cloudresourcemanager_v3_tagkeys_tagkey_create]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Use the createTagKey method
 *
 * @param {string} projectId - The Google Cloud project ID where the TagKey will be created.
 */
async function createTagKey(projectId) {
  try {
    const tagKey = {
      parent: `projects/${projectId}`,
      shortName: 'example_env_key',
      description: 'Environment classification tag key',
    };

    const request = {
      tagKey,
    };

    // Initialize the long-running operation to create the tag key.
    const [operation] = await client.createTagKey(request);

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Created tag key: ${response.name}`);
    console.log(`Short name: ${response.shortName}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tag key already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating tag key: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error creating tag key: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createTagKey };
// [END cloudresourcemanager_v3_tagkeys_tagkey_create]
