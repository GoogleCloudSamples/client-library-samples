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

// [START networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
'use strict';

const {VpcFlowLogsServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new VpcFlowLogsServiceClient();

/**
 * Queries organization-level VPC Flow Logs configurations.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function queryOrgVpcFlowLogsConfigs(projectId) {
  try {
    const parent = `projects/${projectId}/locations/global`;

    const request = {
      parent,
    };

    const [configs] = await client.queryOrgVpcFlowLogsConfigs(request);

    console.log(`Found ${configs.length} VPC Flow Logs configurations.`);
    for (const config of configs) {
      console.log(`VPC Flow Logs config: ${config.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { queryOrgVpcFlowLogsConfigs };
// [END networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
