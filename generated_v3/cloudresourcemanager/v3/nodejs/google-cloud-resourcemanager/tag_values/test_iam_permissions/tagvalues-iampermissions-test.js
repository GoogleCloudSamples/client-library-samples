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

// [START cloudresourcemanager_v3_tagvalues_test_iam_permissions]
'use strict';

const {TagValuesClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new TagValuesClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} tagValueId - The server-assigned numeric ID of the TagValue.
 */
async function testIamPermissions(tagValueId) {
  try {
    const permissions = [
      'resourcemanager.tagValues.get',
      'resourcemanager.tagValues.update',
    ];
    const resource = `tagValues/${tagValueId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    const grantedPermissions = response.permissions || [];

    console.log(`Tested permissions on: ${resource}`);
    console.log(`Granted permissions: ${grantedPermissions.join(', ') || 'none'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag value not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END cloudresourcemanager_v3_tagvalues_test_iam_permissions]
