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

// [START cloudresourcemanager_v3_tagkeys_iampolicy_get]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} tagKeyId - The server-generated numeric ID of the TagKey.
 */
async function getIamPolicy(tagKeyId) {
  const resource = `tagKeys/${tagKeyId}`;

  try {
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    if (policy.bindings && policy.bindings.length > 0) {
      console.log(`Bindings: ${JSON.stringify(policy.bindings, null, 2)}`);
    } else {
      console.log('No bindings found in policy.');
    }

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagKey resource not found: ${resource}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource: ${resource}`);
    } else {
      console.error(`Failed to get IAM policy for ${resource}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END cloudresourcemanager_v3_tagkeys_iampolicy_get]
