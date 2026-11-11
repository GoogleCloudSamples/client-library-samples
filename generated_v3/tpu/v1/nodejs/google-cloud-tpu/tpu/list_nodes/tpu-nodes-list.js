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

// [START tpu_v1_tpu_nodes_list]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Use the listNodes method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (zone or region, e.g. 'us-central1-b', or '-' to list across all locations).
 */
async function listNodes(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [nodes] = await client.listNodes(request);

    if (nodes.length === 0) {
      console.log(`No TPU nodes found in ${parent}.`);
      return;
    }

    console.log(`TPU nodes in ${parent}:`);
    for (const node of nodes) {
      console.log(`- ${node.name} (State: ${node.state}, Accelerator: ${node.acceleratorType})`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for ${projectId}/${locationId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for ${projectId}/${locationId}: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`Failed to list TPU nodes: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listNodes };
// [END tpu_v1_tpu_nodes_list]
