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

// [START cloudtasks_v2beta2_cloudtasks_test_iam_permissions]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the queue resides (e.g., 'us-central1').
 * @param {string} queueId - The ID of the existing queue to test permissions for.
 */
async function testIamPermissions(projectId, locationId, queueId) {
  try {
    const permissions = [
      'cloudtasks.queues.get',
      'cloudtasks.queues.getIamPolicy',
    ];
    const resource = `projects/${projectId}/locations/${locationId}/queues/${queueId}`;

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    const grantedPermissions = response.permissions || [];
    console.log(`Granted permissions: ${grantedPermissions.join(', ')}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Queue not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END cloudtasks_v2beta2_cloudtasks_test_iam_permissions]
