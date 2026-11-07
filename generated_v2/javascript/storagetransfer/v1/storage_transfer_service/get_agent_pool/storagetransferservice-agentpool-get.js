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

// [START storagetransfer_v1_storagetransferservice_agentpool_get]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Retrieves details of a specific Storage Transfer Service agent pool.
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the agent pool.
 * @param {string} agentPoolId - The caller-chosen ID of the agent pool to retrieve.
 */
async function getAgentPool(projectId, agentPoolId) {
  try {
    const name = `projects/${projectId}/agentPools/${agentPoolId}`;
    const [agentPool] = await client.getAgentPool({name});

    console.log(`Retrieved agent pool: ${agentPool.name}`);
    console.log(`State: ${agentPool.state}`);
    return agentPool;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing agent pool: ${err.message}`);
    } else {
      console.error(`Error retrieving agent pool: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAgentPool };
// [END storagetransfer_v1_storagetransferservice_agentpool_get]
