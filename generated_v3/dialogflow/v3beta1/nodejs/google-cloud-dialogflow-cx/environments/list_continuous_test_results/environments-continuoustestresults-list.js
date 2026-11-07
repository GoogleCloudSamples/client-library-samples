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

// [START dialogflow_v3beta1_environments_continuoustestresults_list]
'use strict';

const {EnvironmentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists continuous test results for a Dialogflow CX environment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, 'example-agent-id').
 * @param {string} environmentId - The ID of the environment (for example, 'example-environment-id').
 */
async function listContinuousTestResults(projectId, locationId, agentId, environmentId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new EnvironmentsClient(clientOptions);

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/environments/${environmentId}`;

    const request = {
      parent,
    };

    const [results] = await client.listContinuousTestResults(request);

    if (!results || results.length === 0) {
      console.log('No continuous test results found.');
      return;
    }

    for (const result of results) {
      console.log(`Continuous test result name: ${result.name}`);
      console.log(`Result status: ${result.result}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {listContinuousTestResults};
// [END dialogflow_v3beta1_environments_continuoustestresults_list]
