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

// [START networkservices_v1_networkservices_agentgateway_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the getAgentGateway method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region where the AgentGateway resides (for example, 'us-central1' or 'global').
 * @param {string} agentGatewayId - The identifier of the AgentGateway. This is caller-chosen upon creation.
 */
async function getAgentGateway(projectId, locationId, agentGatewayId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/agentGateways/${agentGatewayId}`;

    const request = {
      name,
    };

    const [agentGateway] = await client.getAgentGateway(request);
    console.log(`Retrieved Agent Gateway: ${agentGateway.name}`);
    return agentGateway;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent Gateway resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for Agent Gateway resource: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for Agent Gateway: ${err.message}`);
    } else {
      console.error(`Failed to retrieve Agent Gateway: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAgentGateway };
// [END networkservices_v1_networkservices_agentgateway_get]
