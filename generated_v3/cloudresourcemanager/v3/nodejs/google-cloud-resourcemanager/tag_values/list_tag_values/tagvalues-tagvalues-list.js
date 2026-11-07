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

// [START cloudresourcemanager_v3_tagvalues_tagvalues_list]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Use the listTagValues method
 *
 * @param {string} tagKeyId - The server-generated ID of the parent TagKey (for example, '123'). Read this from an existing TagKey.
 */
async function listTagValues(tagKeyId) {
  try {
    const parent = `tagKeys/${tagKeyId}`;
    const request = {
      parent,
    };

    const [tagValues] = await client.listTagValues(request);
    console.log(`Listed ${tagValues.length} TagValues:`);
    for (const tagValue of tagValues) {
      console.log(`Name: ${tagValue.name}`);
      console.log(`Short name: ${tagValue.shortName}`);
      console.log(`Description: ${tagValue.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list TagValues: ${err.message}`);
    }
  }
}

module.exports = { listTagValues };
// [END cloudresourcemanager_v3_tagvalues_tagvalues_list]
