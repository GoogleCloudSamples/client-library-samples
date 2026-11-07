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

// [START cloudresourcemanager_v3_tagkeys_test_iam_permissions]
'use strict';

const {TagKeysClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagKeysClient();

/**
 * Tests caller permissions on a TagKey resource.
 *
 * @param {string} tagKeyId - The server-generated numeric identifier of the TagKey.
 */
async function testIamPermissions(tagKeyId) {
  const permissions = [
    'resourcemanager.tagKeys.get',
    'resourcemanager.tagKeys.getIamPolicy',
  ];
  const resource = `tagKeys/${tagKeyId}`;

  try {
    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Granted permissions for ${resource}:`);
    for (const permission of response.permissions || []) {
      console.log(`- ${permission}`);
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TagKey resource not found: ${resource}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied checking permissions for: ${resource}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for TagKey: ${resource}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { testIamPermissions };
// [END cloudresourcemanager_v3_tagkeys_test_iam_permissions]
