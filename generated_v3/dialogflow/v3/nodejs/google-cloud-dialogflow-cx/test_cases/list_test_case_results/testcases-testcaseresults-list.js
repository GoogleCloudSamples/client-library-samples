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

// [START dialogflow_v3_testcases_testcaseresults_list]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists test case results for a specified test case.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} testCaseId - ID of the TestCase (for example, 'example-testcase-id')
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

    console.log(`Retrieved ${results.length} test case result(s):`);
    for (const result of results) {
      console.log(`- Result name: ${result.name}`);
      console.log(`  Test result: ${result.testResult}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list test case results: ${err.message}`);
    }
  }
}

module.exports = {listTestCaseResults};
// [END dialogflow_v3_testcases_testcaseresults_list]
