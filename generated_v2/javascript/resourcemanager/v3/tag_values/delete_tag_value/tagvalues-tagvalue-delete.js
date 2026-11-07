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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_delete]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Use the deleteTagValue method
 *
 * @param {string} tagValueId - Server-generated numeric ID of the TagValue to delete (for example, '123456789012'). Read from a previous CreateTagValue, ListTagValues, or GetNamespacedTagValue response.
 */
async function deleteTagValue(tagValueId) {
  try {
    const name = `tagValues/${tagValueId}`;

    const [operation] = await client.deleteTagValue({
      name,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Tag value deleted: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag value not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Tag value has dependent resources or bindings: ${err.message}`);
    } else {
      console.error(`Failed to delete tag value: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTagValue };
// [END cloudresourcemanager_v3_tagvalues_tagvalue_delete]
