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

// [START cloudresourcemanager_v3_tagbindings_tagbinding_create]
'use strict';

const {TagBindingsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagBindingsClient();

/**
 * Use the createTagBinding method
 *
 * @param {string} parent - The full resource name of the Google Cloud resource to bind the TagValue to (for example, '//cloudresourcemanager.googleapis.com/projects/123').
 * @param {string} tagValueId - The server-generated ID of the TagValue to bind.
 */
async function createTagBinding(parent, tagValueId) {
  try {
    const tagBinding = {
      parent,
      tagValue: `tagValues/${tagValueId}`,
    };

    // Initiates the long-running operation to create the tag binding.
    const [operation] = await client.createTagBinding({
      tagBinding,
    });

    // Waits for the long-running operation to finish.
    const [response] = await operation.promise();

    console.log(`Created tag binding: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tag binding already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating tag binding: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createTagBinding };
// [END cloudresourcemanager_v3_tagbindings_tagbinding_create]
