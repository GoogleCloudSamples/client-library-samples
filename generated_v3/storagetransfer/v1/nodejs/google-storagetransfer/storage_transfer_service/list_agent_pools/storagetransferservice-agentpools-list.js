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

// [START storagetransfer_v1_storagetransferservice_agentpools_list]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Use the listAgentPools method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listAgentPools(projectId) {
  try {
    const request = {
      projectId,
    };

    // Retrieve agent pools for the specified project
    const [agentPools] = await client.listAgentPools(request);

    for (const agentPool of agentPools) {
      console.log(`Agent pool: ${agentPool.name}`);
      console.log(`Display name: ${agentPool.displayName}`);
      console.log(`State: ${agentPool.state}`);
    }
    console.log(`Retrieved ${agentPools.length} agent pool(s).`);

    return agentPools;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project: ${projectId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list agent pools: ${err.message}`);
    }
  }
}

module.exports = { listAgentPools };
// [END storagetransfer_v1_storagetransferservice_agentpools_list]
