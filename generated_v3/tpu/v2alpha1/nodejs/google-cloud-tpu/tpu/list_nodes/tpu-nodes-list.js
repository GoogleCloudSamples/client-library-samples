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

// [START tpu_v2alpha1_tpu_nodes_list]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Lists Cloud TPU nodes in a specified location.
 */
async function listNodes() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-a';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [nodes] = await client.listNodes(request);

    console.log(`Retrieved ${nodes.length} node(s):`);
    for (const node of nodes) {
      console.log(`- Name: ${node.name}, State: ${node.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listNodes };
// [END tpu_v2alpha1_tpu_nodes_list]
