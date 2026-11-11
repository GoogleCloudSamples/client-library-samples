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

// [START iap_v1_identityawareproxyadminservice_test_iam_permissions]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Tests caller permissions on an Identity-Aware Proxy (IAP) protected resource.
 *
 * @param {string} resource - The fully-qualified Identity-Aware Proxy (IAP) protected resource name on which to check permissions, such as projects/{project_id}/iap_tunnel/locations/{location}/destGroups/{tunnel_dest_group_id} or projects/{project_id}/iap_web.
 */
async function testIamPermissions(resource) {
  try {
    const permissions = [
      'iap.tunnelDestGroups.get',
      'iap.tunnelDestGroups.update',
    ];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Granted permissions: ${response.permissions ? response.permissions.join(', ') : 'none'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END iap_v1_identityawareproxyadminservice_test_iam_permissions]
