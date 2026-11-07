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

// [START cloudtasks_v2beta3_cloudtasks_task_create]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks');
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Use the createTask method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} queueId - ID of the Queue (for example, 'example-queue-id')
 * @param {string} responseId - ID of the Response (for example, 'example-response-id')
 * @param {string} scheduleTimeId - ID of the ScheduleTime (for example, 'example-scheduletime-id')
 * @param {string} alreadyExistsId - ID of the AlreadyExists (for example, 'example-alreadyexists-id')
 * @param {string} createTaskId - ID of the CreateTask (for example, 'example-createtask-id')
 */
async function createTask(projectId, locationId, queueId, responseId, scheduleTimeId, alreadyExistsId, createTaskId) {
  try {
    const parent = client.queuePath(projectId, locationId, queueId);
    const name = client.taskPath(projectId, locationId, queueId, createTaskId);

    const httpRequest = {
      httpMethod: 'POST',
      url: 'https://example.com/taskhandler',
      headers: {
        'Content-Type': 'application/json',
      },
      body: Buffer.from(JSON.stringify({ payloadId: responseId })).toString('base64'),
    };

    const task = {
      name,
      httpRequest,
    };

    if (scheduleTimeId) {
      const delaySeconds = parseInt(scheduleTimeId, 10);
      const scheduleOffset = Number.isNaN(delaySeconds) ? 300 : delaySeconds;
      task.scheduleTime = {
        seconds: Math.floor(Date.now() / 1000) + scheduleOffset,
      };
    }

    const request = {
      parent,
      task,
    };

    const [response] = await client.createTask(request);
    console.log(`Created task ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Task already exists: ${alreadyExistsId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Failed to create task: ${err.message}`);
    }
  }
}

module.exports = { createTask };
// [END cloudtasks_v2beta3_cloudtasks_task_create]
