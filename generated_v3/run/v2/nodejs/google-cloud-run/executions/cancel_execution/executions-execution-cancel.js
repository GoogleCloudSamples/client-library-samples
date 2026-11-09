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

// [START run_v2_executions_execution_cancel]
'use strict';

const {ExecutionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ExecutionsClient();

/**
 * Use the cancelExecution method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the Execution is running (for example, 'us-central1').
 * @param {string} jobId - The caller-specified identifier of the parent Cloud Run Job.
 * @param {string} executionId - The server-generated identifier of the Cloud Run execution to cancel.
 */
async function cancelExecution(projectId, locationId, jobId, executionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}/executions/${executionId}`;

    // CancelExecution returns a long-running operation; wait for it to complete.
    const [operation] = await client.cancelExecution({name});
    const [response] = await operation.promise();

    console.log(`Cancelled execution: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Execution not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Execution cannot be cancelled in its current state: ${err.message}`);
    } else {
      console.error(`Failed to cancel execution: ${err.message}`);
    }
  }
}

module.exports = { cancelExecution };
// [END run_v2_executions_execution_cancel]
