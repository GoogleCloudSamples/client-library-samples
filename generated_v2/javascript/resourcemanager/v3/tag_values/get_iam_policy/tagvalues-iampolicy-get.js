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

// [START cloudresourcemanager_v3_tagvalues_iampolicy_get]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Retrieves the IAM access control policy for a TagValue resource.
 *
 * @param {string} tagValueId - The server-generated numeric ID of the TagValue.
 */
async function getIamPolicy(tagValueId) {
  try {
    const resource = `tagValues/${tagValueId}`;

    // Request the IAM policy associated with the specified TagValue resource.
    const [policy] = await client.getIamPolicy({resource});

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(JSON.stringify(policy, null, 2));

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagValue resource not found: ${tagValueId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when retrieving IAM policy for TagValue: ${tagValueId}`);
    } else {
      console.error(`Failed to retrieve IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END cloudresourcemanager_v3_tagvalues_iampolicy_get]
