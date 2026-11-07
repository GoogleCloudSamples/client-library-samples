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

// [START cloudresourcemanager_v3_projects_test_iam_permissions]
'use strict';

const {ProjectsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new ProjectsClient();

/**
 * Tests caller permissions against a Google Cloud project resource.
 *
 * @param {string} projectId - The Google Cloud project ID to test permissions against.
 */
async function testIamPermissions(projectId) {
  try {
    const resource = `projects/${projectId}`;
    const permissions = [
      'resourcemanager.projects.get',
      'resourcemanager.projects.update',
    ];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    const grantedPermissions = response.permissions || [];

    console.log(`Granted permissions: ${grantedPermissions.join(', ')}`);
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied on resource: ${projectId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${projectId}`);
    } else if (err.code) {
      console.error(`API error with code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END cloudresourcemanager_v3_projects_test_iam_permissions]
