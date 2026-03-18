// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START cloudrun_v2_tasks_task_get_async]
const {TasksClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new TasksClient();

/**
 * Get information about a specific Task within a Google Cloud Run Job Execution.
 *
 * This sample demonstrates how to retrieve details for a particular task by its
 * full resource name. This is useful for monitoring the status and output
 * of individual tasks within a larger job execution.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud region where the job is located.
 * @param {string} jobId The ID of the Cloud Run job.
 * @param {string} executionId The ID of the job execution.
 * @param {string} taskId The ID of the specific task to retrieve.
 */
async function getTask(
  projectId = 'your-project-id',
  location = 'us-central1',
  jobId = 'my-job',
  executionId = 'my-job-execution-00001',
  taskId = 'my-task-00001-abcd',
) {
  // Construct the full resource name for the task.
  const name = client.taskPath(projectId, location, jobId, executionId, taskId);

  const request = {
    name,
  };

  try {
    const [task] = await client.getTask(request);
    console.log(`Successfully retrieved task: ${task.name}`);
    console.log(`  State: ${task.conditions?.[0]?.state || 'UNKNOWN'}`);
    if (task.lastAttemptResult?.exitCode !== undefined) {
      console.log(
        `  Last Attempt Exit Code: ${task.lastAttemptResult.exitCode}`,
      );
    }
    if (task.lastAttemptResult?.status?.message) {
      console.log(
        `  Last Attempt Status Message: ${task.lastAttemptResult.status.message}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Task ${taskId} not found in execution ${executionId} of job ${jobId} in location ${location} for project ${projectId}.`,
      );
      console.error(
        'Please ensure the project ID, location, job ID, execution ID, and task ID are correct and the task exists.',
      );
    } else {
      console.error('Error getting task:', err);
    }
  }
}

module.exports = {
  getTask,
};
// [END cloudrun_v2_tasks_task_get_async]

async function main(args) {
  if (args.length !== 5) {
    throw new Error(`5 arguments required but received ${args.length}.`);
  }
  await getTask(args[0], args[1], args[2], args[3], args[4]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'your-project-id'
 - Google Cloud Location like 'us-central1'
 - Cloud Run Job ID like 'my-job'
 - Cloud Run Execution ID like 'my-job-execution-00001'
 - Cloud Run Task ID like 'my-task-00001-abcd'

Usage:

 node tasks-client-task-get-async.js your-project-id us-central1 my-job my-job-execution-00001 my-task-00001-abcd
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}
