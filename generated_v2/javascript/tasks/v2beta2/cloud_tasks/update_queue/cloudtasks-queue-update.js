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

// [START cloudtasks_v2beta2_cloudtasks_queue_update]
'use strict';

const {v2beta2} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new v2beta2.CloudTasksClient();

/**
 * Updates the rate limits of an existing Cloud Tasks queue.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the queue is located.
 * @param {string} queueId - The ID of the existing Cloud Tasks queue to update.
 */
async function updateQueue(projectId, locationId, queueId) {
  try {
    const queue = {
      name: client.queuePath(projectId, locationId, queueId),
      rateLimits: {
        maxTasksDispatchedPerSecond: 5.0,
      },
    };

    const updateMask = {
      paths: ['rate_limits.max_tasks_dispatched_per_second'],
    };

    const request = {
      queue,
      updateMask,
    };

    const [response] = await client.updateQueue(request);
    console.log(`Updated queue: ${response.name}`);
    if (response.rateLimits) {
      console.log(
        `Dispatched tasks limit: ${response.rateLimits.maxTasksDispatchedPerSecond} per second`
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target queue not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided in update request: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while updating queue: ${err.message}`);
    } else {
      console.error(`API operation failed with gRPC status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {updateQueue};
// [END cloudtasks_v2beta2_cloudtasks_queue_update]
