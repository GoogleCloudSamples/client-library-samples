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

// [START cloudtasks_v2beta3_cloudtasks_purge_queue]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Purges all tasks from a Cloud Tasks queue.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} queueId - ID of the Queue (for example, 'example-queue-id')
 */
async function purgeQueue(projectId, locationId, queueId) {
  try {
    const name = client.queuePath(projectId, locationId, queueId);
    const request = {name};

    // Purging a queue removes all of its tasks and takes up to a minute to take effect.
    const [response] = await client.purgeQueue(request);
    console.log(`Purged queue: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified queue does not exist: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing queue: ${err.message}`);
    } else {
      console.error(`Failed to purge queue: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { purgeQueue };
// [END cloudtasks_v2beta3_cloudtasks_purge_queue]
