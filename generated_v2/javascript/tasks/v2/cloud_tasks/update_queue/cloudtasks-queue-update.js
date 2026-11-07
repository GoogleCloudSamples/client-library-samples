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

// [START cloudtasks_v2_cloudtasks_queue_update]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the updateQueue method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the queue is located.
 * @param {string} queueId - The ID of the Cloud Tasks queue.
 */
async function updateQueue(projectId, locationId, queueId) {
  try {
    const queue = {
      name: client.queuePath(projectId, locationId, queueId),
      rateLimits: {
        maxDispatchesPerSecond: 20.0,
      },
    };
    const updateMask = {
      paths: ['rate_limits.max_dispatches_per_second'],
    };

    const request = {
      queue,
      updateMask,
    };

    const [response] = await client.updateQueue(request);
    console.log(`Updated queue: ${response.name}`);
    console.log(
      `Max dispatches per second: ${response.rateLimits.maxDispatchesPerSecond}`
    );
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Queue not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateQueue };
// [END cloudtasks_v2_cloudtasks_queue_update]
