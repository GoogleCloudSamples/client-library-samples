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

// [START cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region hosting the queue (for example, 'us-central1').
 * @param {string} queueId - The identifier of the Cloud Tasks queue.
 */
async function testIamPermissions(projectId, locationId, queueId) {
  try {
    const permissions = [
      'cloudtasks.queues.getIamPolicy',
      'cloudtasks.queues.setIamPolicy',
    ];
    const resource = `projects/${projectId}/locations/${locationId}/queues/${queueId}`;

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Tested permissions on ${resource}:`);
    if (response.permissions && response.permissions.length > 0) {
      for (const permission of response.permissions) {
        console.log(`- ${permission}`);
      }
    } else {
      console.log('No specified permissions are granted to the caller.');
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while testing permissions: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Queue resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
