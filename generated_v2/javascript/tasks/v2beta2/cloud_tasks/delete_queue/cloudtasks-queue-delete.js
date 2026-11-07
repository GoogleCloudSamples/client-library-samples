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

// [START cloudtasks_v2beta2_cloudtasks_queue_delete]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the deleteQueue method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} queueId - ID of the Queue (for example, 'example-queue-id')
 */
async function deleteQueue(projectId, locationId, queueId) {
  const name = client.queuePath(projectId, locationId, queueId);

  try {
    await client.deleteQueue({name});
    console.log(`Deleted queue: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Queue not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied deleting queue: ${name}`);
    } else {
      console.error(`Failed to delete queue: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteQueue };
// [END cloudtasks_v2beta2_cloudtasks_queue_delete]
