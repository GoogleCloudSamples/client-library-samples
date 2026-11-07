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

// [START networkservices_v1_networkservices_agentgateway_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the updateAgentGateway method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the AgentGateway.
 * @param {string} agentGatewayId - The identifier of the AgentGateway to update. Read from an existing resource or caller-specified ID.
 */
async function updateAgentGateway(projectId, locationId, agentGatewayId) {
  try {
    const agentGateway = {
      name: `projects/${projectId}/locations/${locationId}/agentGateways/${agentGatewayId}`,
      description: 'Updated agent gateway description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateAgentGateway({
      agentGateway,
      updateMask,
    });

    const [response] = await operation.promise();

    console.log(`Updated Agent Gateway: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent Gateway was not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateAgentGateway };
// [END networkservices_v1_networkservices_agentgateway_update]
