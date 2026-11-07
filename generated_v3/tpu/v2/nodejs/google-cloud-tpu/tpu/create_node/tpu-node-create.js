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

// [START tpu_v2_tpu_node_create]
'use strict';

const {TpuClient} = require('@google-cloud/tpu').v2;
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Creates a TPU node in the specified project and location using the TPU v2 API.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud zone for the TPU node, such as 'us-central1-a'.
 * @param {string} nodeId - The identifier for the TPU node.
 */
async function createNode(projectId, locationId, nodeId) {
  try {
    const node = {
      acceleratorType: 'v2-8',
      runtimeVersion: 'tpu-vm-tf-2.14.0',
    };
    const parent = client.locationPath(projectId, locationId);

    const [operation] = await client.createNode({
      parent,
      nodeId,
      node,
    });

    const [response] = await operation.promise();
    console.log(`Created TPU node: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TPU node ${nodeId} already exists:`, err.message);
    } else if (err.code) {
      console.error(`Google API error (${err.code}):`, err.message);
    } else {
      console.error('Non-API error encountered:', err);
    }
  }
}

module.exports = { createNode };
// [END tpu_v2_tpu_node_create]
