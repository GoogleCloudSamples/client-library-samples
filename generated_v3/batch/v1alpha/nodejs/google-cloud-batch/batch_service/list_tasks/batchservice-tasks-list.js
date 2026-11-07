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

// [START batch_v1alpha_batchservice_tasks_list]
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
    const parent = client.taskGroupPath(
      projectId,
      locationId,
      jobId,
      taskGroupId
    );

    const request = {
      parent,
    };

    const [tasks] = await client.listTasks(request);

    for (const task of tasks) {
      console.log(`Task name: ${task.name}`);
      console.log(`Task state: ${task.status ? task.status.state : 'UNKNOWN'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Requested resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument specified:', err.message);
    } else {
      console.error('Error listing tasks:', err.message || err);
    }
  }
}

module.exports = { listTasks };
// [END batch_v1alpha_batchservice_tasks_list]
