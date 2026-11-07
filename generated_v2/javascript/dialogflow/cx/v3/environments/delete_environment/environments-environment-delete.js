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

// [START dialogflow_v3_environments_environment_delete]
'use strict';

const {EnvironmentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Dialogflow CX environment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - ID of the agent (for example, 'example-agent-id').
 * @param {string} environmentId - ID of the environment (for example, 'example-environment-id').
 */
async function deleteEnvironment(projectId, locationId, agentId, environmentId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new EnvironmentsClient({apiEndpoint});

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/environments/${environmentId}`;
  const request = {
    name,
  };

  try {
    await client.deleteEnvironment(request);
    console.log(`Deleted environment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Environment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to delete environment: ${err.message}`);
    }
  }
}

module.exports = { deleteEnvironment };
// [END dialogflow_v3_environments_environment_delete]
