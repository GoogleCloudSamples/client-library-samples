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

// [START dialogflow_v3_testcases_batch_run_test_cases]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Runs a batch of test cases for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location where the Dialogflow CX agent resides (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} testCaseId - The server-generated ID of the test case to run.
 */
async function batchRunTestCases(projectId, locationId, agentId, testCaseId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new TestCasesClient(clientOptions);

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const testCases = [
      `projects/${projectId}/locations/${locationId}/agents/${agentId}/testCases/${testCaseId}`,
    ];

    const request = {
      parent,
      testCases,
    };

    // Initiate batch test execution and await the long-running operation
    const [operation] = await client.batchRunTestCases(request);
    const [response] = await operation.promise();

    console.log('Batch run test cases completed successfully.');
    if (response.results) {
      for (const result of response.results) {
        console.log(`Test case result: ${result.name}`);
        console.log(`Status: ${result.testResult}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { batchRunTestCases };
// [END dialogflow_v3_testcases_batch_run_test_cases]
