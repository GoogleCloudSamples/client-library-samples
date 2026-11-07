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

// [START storagetransfer_v1_storagetransferservice_agentpool_create]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Use the createAgentPool method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the agent pool.
 * @param {string} agentPoolId - The client-assigned ID of the agent pool to create. Must be 1-128 characters, start with a lowercase letter, not start with 'goog', and match `^(?!goog)[a-z]([a-z0-9-._~]*[a-z0-9])?$`.
 */
async function createAgentPool(projectId, agentPoolId) {
  try {
    const agentPool = {
      displayName: 'Sample Agent Pool',
    };

    const request = {
      projectId,
      agentPoolId,
      agentPool,
    };

    const [response] = await client.createAgentPool(request);
    console.log(`Created agent pool: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Agent pool '${agentPoolId}' already exists in project '${projectId}'.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for agent pool creation: ${err.message}`);
    } else {
      console.error(`Failed to create agent pool: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAgentPool };
// [END storagetransfer_v1_storagetransferservice_agentpool_create]
