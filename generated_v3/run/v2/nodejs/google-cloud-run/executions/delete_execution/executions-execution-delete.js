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

// [START run_v2_executions_execution_delete]
'use strict';

const {ExecutionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ExecutionsClient();

/**
 * Use the deleteExecution method.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region of the Execution (for example, 'us-central1').
 * @param {string} jobId - The ID of the parent Cloud Run Job (for example, 'example-job').
 * @param {string} executionId - The server-assigned identifier of the Execution to delete (for example, 'example-job-5abcd').
 */
async function deleteExecution(projectId, locationId, jobId, executionId) {
  const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}/executions/${executionId}`;

  try {
    const [operation] = await client.deleteExecution({name});
    const [response] = await operation.promise();

    console.log(`Deleted execution: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Execution not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Execution cannot be deleted: ${err.message}`);
    } else {
      console.error(`Failed to delete execution: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteExecution };
// [END run_v2_executions_execution_delete]
