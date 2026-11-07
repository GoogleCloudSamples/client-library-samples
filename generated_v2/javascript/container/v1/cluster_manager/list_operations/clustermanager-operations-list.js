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

// [START container_v1_clustermanager_operations_list]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Lists operations running in a Google Kubernetes Engine location.
 */
async function listOperations() {
  const location = 'us-central1';

  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [response] = await client.listOperations(request);

    if (!response.operations || response.operations.length === 0) {
      console.log('No operations found.');
      return;
    }

    console.log(`Operations in ${parent}:`);
    for (const operation of response.operations) {
      console.log(`- ID: ${operation.name}`);
      console.log(`  Type: ${operation.operationType}`);
      console.log(`  Status: ${operation.status}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing operations: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else {
      console.error(`Failed to list operations: ${err.message || err}`);
    }
  }
}

module.exports = { listOperations };
// [END container_v1_clustermanager_operations_list]
