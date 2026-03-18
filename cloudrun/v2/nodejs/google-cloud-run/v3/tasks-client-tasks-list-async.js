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

// [START cloudrun_v2_tasks_tasks_list_async]
const {TasksClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new TasksClient();

/**
 * Lists Tasks from a specific Execution of a Cloud Run Job.
 *
 * This sample demonstrates how to retrieve a list of tasks associated with a given
 * job execution. It iterates through the tasks and prints their names and status.
 *
 * @param {string} [projectId='my-project-id'] Your Google Cloud Project ID.
 * @param {string} [location='us-central1'] The Google Cloud region where the job and execution reside (e.g., 'us-central1').
 * @param {string} [jobName='my-job'] The name of the Cloud Run job.
 * @param {string} [executionName='my-job-execution-12345'] The name of the execution within the job.
 */
async function listTasks(
  projectId = 'my-project-id',
  location = 'us-central1',
  jobName = 'my-job',
  executionName = 'my-job-execution-12345',
) {
  // Construct the parent resource name for the execution.
  // Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}
  const parent = client.executionPath(
    projectId,
    location,
    jobName,
    executionName,
  );

  const request = {
    parent,
    // Optionally, specify the maximum number of tasks to return per page.
    // pageSize: 10,
  };

  try {
    // Lists Tasks from an Execution of a Job.
    // The listTasks method handles pagination automatically.
    const [tasks] = await client.listTasks(request);

    if (tasks.length > 0) {
      console.log('Listed Tasks:');
      for (const task of tasks) {
        console.log(`  Task Name: ${task.name}`);
        console.log(`  Task Index: ${task.index}`);
        // The status code 0 typically indicates success for google.rpc.Status.
        const taskStatus =
          task.lastAttemptResult?.status?.code === 0 ? 'Succeeded' : 'Failed';
        console.log(`  Task Status: ${taskStatus}`);
        console.log(`  Log URI: ${task.logUri || 'N/A'}`);
        console.log('---');
      }
    } else {
      console.log(
        `No tasks found for execution '${executionName}' in job '${jobName}'.`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified execution '${executionName}' in job '${jobName}' ` +
          `under project '${projectId}' and location '${location}' was not found. ` +
          'Please ensure the job and execution names are correct and exist.',
      );
    } else {
      console.error('An error occurred while listing tasks:', err);
      // In a production application, you might log the full error details for debugging.
    }
  }
}

// To run this sample, call the function with your project, location, job, and execution names.
// For example:
// listTasks('my-project-id', 'us-central1', 'my-job', 'my-job-execution-12345');
// [END cloudrun_v2_tasks_tasks_list_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`4 arguments required but received ${args.length}.`);
  }
  await listTasks(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Cloud Run Job Name like 'my-job'
 - Cloud Run Execution Name like 'my-job-execution-12345'

Usage:

 node tasks-client-tasks-list-async.js my-project-id us-central1 my-job my-job-execution-12345
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listTasks,
};
