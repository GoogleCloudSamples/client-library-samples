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

// [START dialogflow_v3_environments_deploy_flow]
'use strict';

const {EnvironmentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deploys a flow version to a Dialogflow CX environment.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId The Google Cloud region where the service is located (for example, 'global' or 'us-central1').
 * @param {string} agentId The ID of the Agent (for example, 'example-agent-id').
 * @param {string} environmentId The ID of the Environment (for example, 'example-environment-id').
 * @param {string} flowId The ID of the Flow (for example, 'example-flow-id').
 * @param {string} versionId The ID of the Version (for example, 'example-version-id').
 */
async function deployFlow(projectId, locationId, agentId, environmentId, flowId, versionId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new EnvironmentsClient(clientOptions);

  try {
    const environment = `projects/${projectId}/locations/${locationId}/agents/${agentId}/environments/${environmentId}`;
    const flowVersion = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${versionId}`;

    const request = {
      environment,
      flowVersion,
    };

    // DeployFlow initiates a long-running operation.
    const [operation] = await client.deployFlow(request);
    const [response] = await operation.promise();

    console.log(`Flow deployed to environment: ${response.environment.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Deployment failed: ${err.message}`);
    }
  }
}

module.exports = { deployFlow };
// [END dialogflow_v3_environments_deploy_flow]
