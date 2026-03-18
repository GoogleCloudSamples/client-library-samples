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

// [START cloudrun_v2_executions_execution_get_async]
const {ExecutionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // Import status codes for error handling

const client = new ExecutionsClient();

/**
 * Retrieves details for a specific Cloud Run execution.
 *
 * This sample demonstrates how to get information about a particular execution
 * within a given job. Executions represent a single run of a job.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud region where the execution is located.
 * @param {string} jobId The ID of the job that owns the execution.
 * @param {string} executionId The ID of the execution to retrieve.
 */
async function getExecution(
  projectId = 'your-project-id', // Replace with your Google Cloud Project ID
  location = 'us-central1', // Replace with the appropriate region
  jobId = 'my-job', // Replace with the ID of your job
  executionId = 'my-job-execution-12345', // Replace with the ID of the execution to retrieve
) {
  // Construct the full resource name for the execution.
  const name = client.executionPath(projectId, location, jobId, executionId);

  const request = {
    name,
  };

  try {
    const [execution] = await client.getExecution(request);

    console.log(`Successfully retrieved execution: ${execution.name}`);
    console.log(`  UID: ${execution.uid}`);
    console.log(`  Job: ${execution.job}`);
    // Conditions provide detailed status. Check the first one for a summary.
    if (execution.conditions && execution.conditions.length > 0) {
      console.log(
        `  Status: ${execution.conditions[0].reason || execution.conditions[0].type}`,
      );
      console.log(`  Message: ${execution.conditions[0].message || 'N/A'}`);
    } else {
      console.log('  Status: No conditions available.');
    }
    console.log(`  Parallelism: ${execution.parallelism}`);
    console.log(`  Task Count: ${execution.taskCount}`);
    console.log(`  Succeeded Tasks: ${execution.succeededCount}`);
    console.log(`  Failed Tasks: ${execution.failedCount}`);
    console.log(`  Log URI: ${execution.logUri || 'N/A'}`);
  } catch (err) {
    // Check if the error is a NOT_FOUND error (gRPC status code 5)
    // The `err.code` from google-gax typically maps to gRPC status codes.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Execution '${executionId}' not found in job '${jobId}' in location '${location}' of project '${projectId}'. ` +
          'Please ensure the execution ID, job ID, location, and project ID are correct.',
      );
    } else {
      console.error(`Error retrieving execution ${name}:`, err);
    }
  }
}
// [END cloudrun_v2_executions_execution_get_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`4 arguments required but received ${args.length}.`);
  }
  await getExecution(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Job ID like 'my-job'
 - Execution ID like 'my-job-execution-12345'

Usage:

 node executions-client-execution-get-async.js my-project-id us-central1 my-job my-job-execution-12345
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getExecution,
};
