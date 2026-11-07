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

// [START networkservices_v1_networkservices_agentgateway_delete]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Deletes an AgentGateway resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentGatewayId - ID of the AgentGateway (for example, 'example-agentgateway-id')
 */
async function deleteAgentGateway(projectId, locationId, agentGatewayId) {
  try {
    const isLocation = val =>
      typeof val === 'string' &&
      (val === 'global' || /^[a-z]+[0-9]*-[a-z0-9]+$/.test(val));

    let resolvedProjectId = projectId;
    let resolvedLocationId = locationId;
    let resolvedAgentGatewayId = agentGatewayId;

    // Normalize arguments if passed in alternative order
    if (isLocation(resolvedProjectId)) {
      resolvedLocationId = projectId;
      resolvedAgentGatewayId = locationId;
      resolvedProjectId = agentGatewayId;
    } else if (
      !isLocation(resolvedLocationId) &&
      resolvedAgentGatewayId &&
      !isLocation(resolvedAgentGatewayId)
    ) {
      resolvedProjectId = agentGatewayId;
      resolvedAgentGatewayId = locationId;
      resolvedLocationId = undefined;
    }

    if (!resolvedProjectId || resolvedProjectId === 'undefined') {
      try {
        resolvedProjectId = await client.getProjectId();
      } catch {
        resolvedProjectId =
          process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
      }
    }

    if (!resolvedLocationId || resolvedLocationId === 'undefined') {
      resolvedLocationId =
        process.env.LOCATION_ID ||
        process.env.GOOGLE_CLOUD_LOCATION ||
        'global';
    }

    const name = `projects/${resolvedProjectId}/locations/${resolvedLocationId}/agentGateways/${resolvedAgentGatewayId}`;
    const request = {
      name,
    };

    // Initiate the long-running operation to delete the AgentGateway
    const [operation] = await client.deleteAgentGateway(request);

    // Wait for the long-running operation to complete
    await operation.promise();

    console.log(`AgentGateway deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`AgentGateway not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete AgentGateway: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {deleteAgentGateway};
// [END networkservices_v1_networkservices_agentgateway_delete]
