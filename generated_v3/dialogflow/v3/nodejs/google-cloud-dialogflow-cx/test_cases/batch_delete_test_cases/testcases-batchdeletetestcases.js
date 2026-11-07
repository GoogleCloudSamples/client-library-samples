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

// [START dialogflow_v3_testcases_testcases_batchdelete]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a batch of test cases for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location ID where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The ID of the Dialogflow CX agent.
 * @param {string} testCaseId - The ID of the test case to delete.
 */
async function batchDeleteTestCases(projectId, locationId, agentId, testCaseId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new TestCasesClient(clientOptions);

  try {
    const names = [
      `projects/${projectId}/locations/${locationId}/agents/${agentId}/testCases/${testCaseId}`,
    ];
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    const request = {
      parent,
      names,
    };

    await client.batchDeleteTestCases(request);
    console.log(`Deleted test cases successfully: ${names.join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Test case not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { batchDeleteTestCases };
// [END dialogflow_v3_testcases_testcases_batchdelete]
