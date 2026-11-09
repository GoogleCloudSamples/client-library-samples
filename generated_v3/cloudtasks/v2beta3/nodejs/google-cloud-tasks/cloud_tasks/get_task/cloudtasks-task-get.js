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

// [START cloudtasks_v2beta3_cloudtasks_task_get]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the getTask method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} queueId - ID of the Queue (for example, 'example-queue-id')
 * @param {string} taskId - ID of the Task (for example, 'example-task-id')
 */
async function getTask(projectId, locationId, queueId, taskId) {
  const name = client.taskPath(projectId, locationId, queueId, taskId);

  try {
    const request = {
      name,
    };

    const [task] = await client.getTask(request);
    console.log(`Task name: ${task.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Task was not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing task: ${name}`);
    } else {
      console.error(`Error retrieving task: ${err.message}`);
    }
  }
}

module.exports = { getTask };
// [END cloudtasks_v2beta3_cloudtasks_task_get]
