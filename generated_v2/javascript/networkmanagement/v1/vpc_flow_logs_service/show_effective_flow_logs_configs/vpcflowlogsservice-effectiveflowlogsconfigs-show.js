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

// [START networkmanagement_v1_vpcflowlogsservice_show_effective_flow_logs_configs]
'use strict';

const {VpcFlowLogsServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new VpcFlowLogsServiceClient();

/**
 * Retrieves effective VPC Flow Logs configurations for a given resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID. For VPC Flow Logs configurations, this must be 'global'.
 * @param {string} resource - The resource name to get the effective VPC Flow Logs configuration for.
 */
async function showEffectiveFlowLogsConfigs(projectId, locationId, resource) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    // The API requires a Network, Subnetwork, InterconnectAttachment, or VpnTunnel resource name.
    // If a project-level resource name is passed, target the default network within that project.
    let targetResource = resource;
    if (/^projects\/[^/]+$/.test(targetResource)) {
      targetResource = `${targetResource}/global/networks/default`;
    }

    const request = {
      parent,
      resource: targetResource,
    };

    const [configs] = await client.showEffectiveFlowLogsConfigs(request);

    console.log(`Effective VPC Flow Logs configurations for resource: ${targetResource}`);
    for (const config of configs) {
      console.log(`- Configuration name: ${config.name}`);
      console.log(`  State: ${config.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {showEffectiveFlowLogsConfigs};
// [END networkmanagement_v1_vpcflowlogsservice_show_effective_flow_logs_configs]
