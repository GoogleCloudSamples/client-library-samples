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

// [START cloudrun_v2_executions_executions_list_async]
const {ExecutionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new ExecutionsClient();

/**
 * Lists all executions for a given job in a specific project and location.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud region where the job is located (e.g., 'us-central1').
 * @param {string} jobId The ID of the job to list executions for (e.g., 'my-job').
 */
async function listExecutionsSample(
  projectId = 'your-project-id',
  location = 'us-central1',
  jobId = 'my-job',
) {
  const parent = client.jobPath(projectId, location, jobId);

  const request = {
    parent,
  };

  try {
    // List all executions for the specified job.
    // The client library will automatically handle pagination.
    const [executions] = await client.listExecutions(request);
    if (executions.length === 0) {
      console.log(`No executions found for job ${jobId} in ${location}.`);
      return;
    }

    console.log(`Executions for job ${jobId} in ${location}:`);
    for (const execution of executions) {
      console.log(`- Execution Name: ${execution.name}`);
      console.log(`  Status: ${execution.conditions?.[0]?.type || 'N/A'}`);
      console.log(`  Running Tasks: ${execution.runningCount}`);
      console.log(`  Succeeded Tasks: ${execution.succeededCount}`);
      console.log(`  Failed Tasks: ${execution.failedCount}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The job ${jobId} in location ${location} was not found. Please check the job ID and location.`,
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied. Ensure the service account has the necessary roles (e.g., roles/run.viewer) for project ${projectId}.`,
      );
    } else {
      console.error('Error listing executions:', err);
    }
  }
}
// [END cloudrun_v2_executions_executions_list_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await listExecutionsSample(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Job ID like 'my-job'

Usage:

 node executions-client-executions-list-async.js my-project-id us-central1 my-job
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listExecutionsSample,
};
