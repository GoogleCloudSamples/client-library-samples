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

// [START batch_v1_batchservice_tasks_list]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the listTasks method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 * @param {string} taskGroupId - ID of the TaskGroup (for example, 'example-taskgroup-id')
 */
async function listTasks(projectId, locationId, jobId, taskGroupId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/jobs/${jobId}/taskGroups/${taskGroupId}`;

    const request = {
      parent,
    };

    const [tasks] = await client.listTasks(request);

    if (!tasks || tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }

    for (const task of tasks) {
      console.log(`Task: ${task.name}`);
      console.log(`State: ${task.status?.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Task group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listTasks };
// [END batch_v1_batchservice_tasks_list]
