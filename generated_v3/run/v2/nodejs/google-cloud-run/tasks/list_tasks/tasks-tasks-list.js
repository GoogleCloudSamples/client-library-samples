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

// [START run_v2_tasks_tasks_list]
'use strict';

const {TasksClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new TasksClient();

/**
 * Use the listTasks method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 * @param {string} executionId - ID of the Execution (for example, 'example-execution-id')
 */
async function listTasks(projectId, locationId, jobId, executionId) {
  try {
    const parent = client.executionPath(projectId, locationId, jobId, executionId);

    const request = {
      parent,
    };

    // Iterate through tasks belonging to the execution
    const [tasks] = await client.listTasks(request);

    for (const task of tasks) {
      console.log(`Task: ${task.name}`);
      console.log(`  State: ${task.state}`);
      console.log(`  Attempt count: ${task.attemptCount}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for job execution: ${jobId}/${executionId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing tasks for execution: ${executionId}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listTasks };
// [END run_v2_tasks_tasks_list]
