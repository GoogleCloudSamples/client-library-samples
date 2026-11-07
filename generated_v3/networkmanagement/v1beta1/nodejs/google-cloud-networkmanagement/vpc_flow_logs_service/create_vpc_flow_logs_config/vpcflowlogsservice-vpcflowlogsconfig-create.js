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

// [START networkmanagement_v1beta1_vpcflowlogsservice_vpcflowlogsconfig_create]
'use strict';

const {VpcFlowLogsServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new VpcFlowLogsServiceClient();

/**
 * Use the createVpcFlowLogsConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} vpcFlowLogsConfigId - ID of the VpcFlowLogsConfig (for example, 'example-vpcflowlogsconfig-id')
 */
async function createVpcFlowLogsConfig(projectId, vpcFlowLogsConfigId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const vpcFlowLogsConfig = {
      description: 'VPC flow logs configuration',
      state: 'ENABLED',
      aggregationInterval: 'INTERVAL_5_SEC',
      flowSampling: 0.5,
      metadata: 'INCLUDE_ALL_METADATA',
    };

    const request = {
      parent,
      vpcFlowLogsConfigId,
      vpcFlowLogsConfig,
    };

    const [operation] = await client.createVpcFlowLogsConfig(request);
    const [response] = await operation.promise();

    console.log(`Created VPC Flow Logs configuration: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Configuration already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createVpcFlowLogsConfig };
// [END networkmanagement_v1beta1_vpcflowlogsservice_vpcflowlogsconfig_create]
