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

// [START cloudtasks_v2beta3_cloudtasks_tasks_batchcreate]
'use strict';

const {CloudTasksClient} = require('@google-cloud/tasks').v2beta3;
const {status} = require('@grpc/grpc-js');

const client = new CloudTasksClient();

/**
 * Creates multiple tasks in a queue in a single batch request.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the queue is located (for example, 'us-central1')
 * @param {string} queueId - The queue ID (for example, 'example-queue-id')
 */
async function batchCreateTasks(projectId, locationId, queueId) {
  try {
    const parent = client.queuePath(projectId, locationId, queueId);

    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url: 'https://example.com/taskhandler',
        body: Buffer.from(JSON.stringify({message: 'Task payload'})).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };

    const requests = [
      {
        parent,
        task,
      },
    ];

    const [response] = await client.batchCreateTasks({
      parent,
      requests,
    });

    const tasks = response.tasks || (Array.isArray(response) ? response : []);
    console.log(`Created ${tasks.length} tasks.`);
    for (const createdTask of tasks) {
      console.log(`Created task: ${createdTask.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Queue not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Task already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
  }
}

module.exports = { batchCreateTasks };
// [END cloudtasks_v2beta3_cloudtasks_tasks_batchcreate]
