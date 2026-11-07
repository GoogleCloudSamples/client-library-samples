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

// [START cloudtasks_v2beta2_cloudtasks_run_task]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Runs a task immediately in Cloud Tasks.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} queueId - ID of the queue (for example, 'example-queue-id').
 * @param {string} taskId - ID of the task (for example, 'example-task-id').
 */
async function runTask(projectId, locationId, queueId, taskId) {
  try {
    const name = client.taskPath(projectId, locationId, queueId, taskId);

    const request = {
      name: name,
    };

    const [response] = await client.runTask(request);
    console.log(`Executed task: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The specified task or queue was not found.');
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Task cannot be executed due to failed preconditions.');
    } else if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error('Task execution quota or rate limit exceeded.');
    } else {
      console.error(`Error executing task: ${err.message}`);
    }
  }
}

module.exports = { runTask };
// [END cloudtasks_v2beta2_cloudtasks_run_task]
