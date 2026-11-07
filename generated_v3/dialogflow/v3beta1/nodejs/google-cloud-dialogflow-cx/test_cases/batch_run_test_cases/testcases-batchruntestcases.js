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

// [START dialogflow_v3beta1_testcases_batch_run_test_cases]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Runs a batch of test cases for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} testCaseId - ID of the TestCase (for example, 'example-testcase-id')
 */
async function batchRunTestCases(projectId, locationId, agentId, testCaseId) {
  try {
    const apiEndpoint =
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`;
    const client = new TestCasesClient({apiEndpoint});

    const testCases = `projects/${projectId}/locations/${locationId}/agents/${agentId}/testCases/${testCaseId}`;
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    const request = {
      parent,
      testCases: [testCases],
    };

    // Starts the long-running operation to run the test cases
    const [operation] = await client.batchRunTestCases(request);
    const [response] = await operation.promise();

    console.log(`Batch run test cases operation completed: ${operation.name}`);
    if (response.results && response.results.length > 0) {
      for (const result of response.results) {
        console.log(`Test case result: ${result.name}, status: ${result.testResult}`);
      }
    } else {
      console.log('Batch run completed with no test results.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { batchRunTestCases };
// [END dialogflow_v3beta1_testcases_batch_run_test_cases]
