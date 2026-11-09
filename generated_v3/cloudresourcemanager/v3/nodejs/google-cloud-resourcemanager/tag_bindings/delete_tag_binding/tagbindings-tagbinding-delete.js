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

// [START cloudresourcemanager_v3_tagbindings_tagbinding_delete]
'use strict';

const {TagBindingsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagBindingsClient();

/**
 * Use the deleteTagBinding method
 *
 * @param {string} tagBindingId - The server-generated ID of the TagBinding to delete, formatted as a URL-encoded string combining the target resource's full resource name and the tag value.
 */
async function deleteTagBinding(tagBindingId) {
  try {
    const name = `tagBindings/${tagBindingId}`;

    const [operation] = await client.deleteTagBinding({name});
    await operation.promise();

    console.log(`Deleted TagBinding: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagBinding not found: tagBindings/${tagBindingId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied deleting TagBinding: tagBindings/${tagBindingId}`);
    } else {
      console.error(`Failed to delete TagBinding: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTagBinding };
// [END cloudresourcemanager_v3_tagbindings_tagbinding_delete]
