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

// [START dialogflow_v3beta1_testcases_testcase_get]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dialogflow CX test case.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - The server-generated unique identifier of the Dialogflow CX agent (for example, '00000000-0000-0000-0000-000000000000'). Read this from an existing Agent resource.
 * @param {string} testCaseId - The server-generated unique identifier of the test case (for example, '00000000-0000-0000-0000-000000000000'). Read this from an existing TestCase resource.
 */
async function getTestCase(projectId, locationId, agentId, testCaseId) {
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

    const [testCase] = await client.getTestCase(request);

    console.log(`Test case name: ${testCase.name}`);
    console.log(`Display name: ${testCase.displayName}`);
    return testCase;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Test case not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getTestCase };
// [END dialogflow_v3beta1_testcases_testcase_get]
