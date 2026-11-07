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

// [START cloudtasks_v2beta3_cloudtasks_queue_create]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the createQueue method
 *
 * @param {string} projectId - The Google Cloud project ID where the queue will be created.
 * @param {string} locationId - The Google Cloud region/location ID where the queue will be created (for example, 'us-central1').
 * @param {string} queueId - The user-specified identifier for the queue to create (for example, 'my-queue'). Must contain only letters ([A-Za-z]), numbers ([0-9]), or hyphens (-), with a maximum length of 100 characters.
 */
async function createQueue(projectId, locationId, queueId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const queue = {
      name: `projects/${projectId}/locations/${locationId}/queues/${queueId}`,
    };

    const [response] = await client.createQueue({
      parent,
      queue,
    });

    console.log(`Created queue: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Queue already exists: ${queueId}`);
      return;
    }
    throw err;
  }
}

module.exports = { createQueue };
// [END cloudtasks_v2beta3_cloudtasks_queue_create]
