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

// [START tpu_v2alpha1_tpu_node_create]
'use strict';

const {v2alpha1} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2alpha1.TpuClient();

/**
 * Creates a TPU node in the specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (zone) for the TPU node.
 * @param {string} nodeId - The unqualified identifier for the TPU node to create.
 */
async function createNode(projectId, locationId, nodeId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const node = {
      acceleratorType: 'v2-8',
      runtimeVersion: 'tpu-vm-base',
      description: 'Sample TPU Node',
    };

    const request = {
      parent,
      nodeId,
      node,
    };

    // Initiate node creation and wait for the long-running operation to complete.
    const [operation] = await client.createNode(request);
    const [response] = await operation.promise();

    console.log(`Created TPU node: ${response.name}`);
    console.log(`Node state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TPU node ${nodeId} already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for node creation: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when creating TPU node: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when creating TPU node: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createNode };
// [END tpu_v2alpha1_tpu_node_create]
