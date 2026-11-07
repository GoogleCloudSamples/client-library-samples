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

// [START dialogflow_v3_testcases_testcases_list]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists test cases for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the agent is located (for example, 'us-central1')
 * @param {string} agentId - ID of the agent (for example, 'example-agent-id')
 */
async function listTestCases(projectId, locationId, agentId) {
  try {
    // Regional endpoints are required for Dialogflow CX operations outside the global region.
    const apiEndpoint =
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`;

    const client = new TestCasesClient({apiEndpoint});

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    const request = {
      parent,
    };

    const [testCases] = await client.listTestCases(request);

    console.log(`Retrieved ${testCases.length} test case(s):`);
    for (const testCase of testCases) {
      console.log(`- ${testCase.displayName} (${testCase.name})`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listTestCases };
// [END dialogflow_v3_testcases_testcases_list]
