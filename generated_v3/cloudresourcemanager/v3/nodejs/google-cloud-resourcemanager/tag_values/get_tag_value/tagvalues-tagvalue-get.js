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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_get]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Retrieves a TagValue resource by its server-generated identifier.
 *
 * @param {string} tagValueId - The server-generated unique identifier of the TagValue, for example, '123456789012'.
 */
async function getTagValue(tagValueId) {
  try {
    const name = `tagValues/${tagValueId}`;
    const [tagValue] = await client.getTagValue({name});

    console.log(`Resource Name: ${tagValue.name}`);
    console.log(`Short Name: ${tagValue.shortName}`);
    console.log(`Parent: ${tagValue.parent}`);

    return tagValue;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagValue ${tagValueId} not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing TagValue ${tagValueId}.`);
    } else {
      console.error(`API request failed with error code ${err.code}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { getTagValue };
// [END cloudresourcemanager_v3_tagvalues_tagvalue_get]
