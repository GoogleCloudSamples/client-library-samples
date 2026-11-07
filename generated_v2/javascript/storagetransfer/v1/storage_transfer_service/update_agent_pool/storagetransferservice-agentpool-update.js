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

// [START storagetransfer_v1_storagetransferservice_agentpool_update]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Use the updateAgentPool method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the agent pool.
 * @param {string} agentPoolId - The client-assigned identifier of the agent pool to update.
 */
async function updateAgentPool(projectId, agentPoolId) {
  try {
    const agentPool = {
      name: `projects/${projectId}/agentPools/${agentPoolId}`,
      displayName: 'Updated Agent Pool Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [response] = await client.updateAgentPool({
      agentPool,
      updateMask,
    });

    console.log(`Updated agent pool: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent pool not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
  }
}

module.exports = { updateAgentPool };
// [END storagetransfer_v1_storagetransferservice_agentpool_update]
