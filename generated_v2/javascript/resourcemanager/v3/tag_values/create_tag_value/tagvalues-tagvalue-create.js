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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_create]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Creates a TagValue resource under an existing TagKey.
 *
 * @param {string} tagKeyId - The unique server-generated ID of the parent TagKey.
 */
async function createTagValue(tagKeyId) {
  try {
    const tagValue = {
      parent: `tagKeys/${tagKeyId}`,
      shortName: 'production',
      description: 'Environment tag value for production resources',
    };

    // Start the long-running operation to create the TagValue
    const [operation] = await client.createTagValue({tagValue});

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Created TagValue: ${response.name}`);
    console.log(`Short name: ${response.shortName}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TagValue already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent TagKey not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error (code ${err.code}): ${err.message}`);
    }
  }
}

module.exports = { createTagValue };
// [END cloudresourcemanager_v3_tagvalues_tagvalue_create]
