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

// [START servicedirectory_v1beta1_registrationservice_test_iam_permissions]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Tests IAM permissions on a Service Directory namespace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 * @param {string} namespaceId - The Service Directory namespace identifier.
 */
async function testIamPermissions(projectId, locationId, namespaceId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}`;
    const permissions = [
      'servicedirectory.namespaces.get',
      'servicedirectory.namespaces.update',
    ];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Allowed permissions: ${JSON.stringify(response.permissions)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
      return;
    }
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Caller lacks required permission: ${err.message}`);
      return;
    }
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
      return;
    }
    console.error(`Request failed with status code ${err.code}: ${err.message}`);
  }
}

module.exports = { testIamPermissions };
// [END servicedirectory_v1beta1_registrationservice_test_iam_permissions]
