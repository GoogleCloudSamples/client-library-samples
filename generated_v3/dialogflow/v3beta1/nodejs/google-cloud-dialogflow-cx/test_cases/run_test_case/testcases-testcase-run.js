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

// [START dialogflow_v3beta1_testcases_run_test_case]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Runs a test case in a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is hosted (for example, 'us-central1' or 'global').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} testCaseId - The server-generated ID of the test case to run.
 */
async function runTestCase(projectId, locationId, agentId, testCaseId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new TestCasesClient(clientOptions);

    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/testCases/${testCaseId}`;

    const request = {
      name,
    };

    // Initiates the long-running operation to run the test case
    const [operation] = await client.runTestCase(request);

    // Waits for the operation to complete
    const [response] = await operation.promise();

    console.log(`Test run completed for: ${response.result.name}`);
    console.log(`Execution status: ${response.result.testResult}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API error (code ${err.code}): ${err.message}`);
    }
  }
}

module.exports = {runTestCase};
// [END dialogflow_v3beta1_testcases_run_test_case]
