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

// [START dialogflow_v3beta1_testcases_calculate_coverage]
'use strict';

const {TestCasesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Calculates test case coverage for a Dialogflow CX agent.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - Identifier of the agent (for example, 'example-agent-id')
 */
async function calculateCoverage(projectId, locationId, agentId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;
  const client = new TestCasesClient({apiEndpoint});

  try {
    const agent = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;
    const type = 'INTENT';

    const [response] = await client.calculateCoverage({
      agent,
      type,
    });

    console.log(`Calculated coverage for agent: ${response.agent}`);
    if (response.intentCoverage) {
      console.log(`Coverage score: ${response.intentCoverage.coverageScore}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { calculateCoverage };
// [END dialogflow_v3beta1_testcases_calculate_coverage]
