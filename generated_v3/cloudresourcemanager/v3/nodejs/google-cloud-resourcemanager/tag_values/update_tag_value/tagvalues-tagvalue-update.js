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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_update]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Use the updateTagValue method
 *
 * @param {string} tagValueId - The server-generated numeric ID of the TagValue to update (for example, '123456789012'). Read from an existing TagValue resource name.
 */
async function updateTagValue(tagValueId) {
  try {
    const tagValue = {
      name: `tagValues/${tagValueId}`,
      description: 'Updated description for tag value',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateTagValue({
      tagValue,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated tag value: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag value not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update tag value: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTagValue };
// [END cloudresourcemanager_v3_tagvalues_tagvalue_update]
