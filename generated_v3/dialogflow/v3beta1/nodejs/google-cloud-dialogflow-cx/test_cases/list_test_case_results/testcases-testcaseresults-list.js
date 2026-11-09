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

// [START dialogflow_v3beta1_testcases_testcaseresults_list]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists test case results for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} testCaseId - The server-generated ID of the test case, or '-' to list results across all test cases in the agent.
 */
async function listTestCaseResults(projectId, locationId, agentId, testCaseId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new TestCasesClient(clientOptions);

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/testCases/${testCaseId}`;

    const request = {
      parent,
    };

    const [results] = await client.listTestCaseResults(request);

    if (!results || results.length === 0) {
      console.log('No test case results found.');
      return;
    }

    for (const result of results) {
      console.log(`Test Case Result: ${result.name}`);
      console.log(`Status: ${result.testResult}`);
      if (result.testTime) {
        console.log(`Run Time: ${new Date(Number(result.testTime.seconds) * 1000).toISOString()}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = {listTestCaseResults};
// [END dialogflow_v3beta1_testcases_testcaseresults_list]
