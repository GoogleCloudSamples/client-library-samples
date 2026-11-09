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

// [START networkservices_v1_networkservices_agentgateway_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createAgentGateway method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentGatewayId - ID of the AgentGateway (for example, 'example-agentgateway-id')
 */
async function createAgentGateway(projectId, locationId, agentGatewayId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const agentGateway = {
      description: 'Example Agent Gateway',
    };

    const request = {
      parent,
      agentGatewayId,
      agentGateway,
    };

    const [operation] = await client.createAgentGateway(request);
    const [response] = await operation.promise();

    console.log(`Created Agent Gateway: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Agent Gateway already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createAgentGateway };
// [END networkservices_v1_networkservices_agentgateway_create]
