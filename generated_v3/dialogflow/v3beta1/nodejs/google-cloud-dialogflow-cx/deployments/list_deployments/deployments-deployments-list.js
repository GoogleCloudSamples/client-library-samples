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

// [START dialogflow_v3beta1_deployments_deployments_list]
'use strict';

const {DeploymentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists deployments for a Dialogflow CX environment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} environmentId - ID of the Environment (for example, 'example-environment-id')
 */
async function listDeployments(projectId, locationId, agentId, environmentId) {
  try {
    const apiEndpoint =
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`;
    const client = new DeploymentsClient({apiEndpoint});

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/environments/${environmentId}`;

    const request = {
      parent,
    };

    const [deployments] = await client.listDeployments(request);

    console.log(`Found ${deployments.length} deployment(s):`);
    for (const deployment of deployments) {
      console.log(`Deployment name: ${deployment.name}`);
      console.log(`Deployment state: ${deployment.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing deployments: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listDeployments };
// [END dialogflow_v3beta1_deployments_deployments_list]
