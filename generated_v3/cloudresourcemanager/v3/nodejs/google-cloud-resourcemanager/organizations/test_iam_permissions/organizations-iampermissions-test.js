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

// [START cloudresourcemanager_v3_organizations_test_iam_permissions]
'use strict';

const {OrganizationsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new OrganizationsClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} organizationId - The server-generated numeric ID of the organization to test permissions against. Obtain this from an existing Organization resource.
 */
async function testIamPermissions(organizationId) {
  try {
    const resource = `organizations/${organizationId}`;
    const permissions = ['resourcemanager.organizations.get'];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Resource: ${resource}`);
    console.log('Granted permissions:');
    if (response.permissions && response.permissions.length > 0) {
      for (const permission of response.permissions) {
        console.log(`- ${permission}`);
      }
    } else {
      console.log('None of the requested permissions are granted.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Organization not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END cloudresourcemanager_v3_organizations_test_iam_permissions]
