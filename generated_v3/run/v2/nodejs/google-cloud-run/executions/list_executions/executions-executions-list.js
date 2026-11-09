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

// [START run_v2_executions_executions_list]
'use strict';

const {ExecutionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ExecutionsClient();

/**
 * Lists Cloud Run executions in a given project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listExecutions(projectId) {
  try {
    const location = 'us-central1';
    // Use '-' as the job wildcard to list executions across all jobs in the location.
    const parent = `projects/${projectId}/locations/${location}/jobs/-`;

    const request = {
      parent,
    };

    const [executions] = await client.listExecutions(request);

    console.log(`Found ${executions.length} execution(s):`);
    for (const execution of executions) {
      console.log(`Execution name: ${execution.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message || err}`);
    }
  }
}

module.exports = { listExecutions };
// [END run_v2_executions_executions_list]
