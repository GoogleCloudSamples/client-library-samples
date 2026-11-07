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

// [START run_v2_executions_execution_get]
'use strict';

const {ExecutionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ExecutionsClient();

/**
 * Use the getExecution method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1') where the Cloud Run job and execution are located.
 * @param {string} jobId - The caller-chosen name of the parent Cloud Run job.
 * @param {string} executionId - The server-generated ID of the Cloud Run execution.
 */
async function getExecution(projectId, locationId, jobId, executionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}/executions/${executionId}`;

    const [execution] = await client.getExecution({name});

    console.log(`Execution name: ${execution.name}`);
    console.log(`Execution status: ${execution.reconciling ? 'Reconciling' : 'Ready'}`);

    return execution;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Execution not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve execution: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getExecution };
// [END run_v2_executions_execution_get]
