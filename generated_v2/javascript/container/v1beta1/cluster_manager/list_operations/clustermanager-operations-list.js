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

// [START container_v1beta1_clustermanager_operations_list]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Lists Google Kubernetes Engine operations within a project and location.
 */
async function listOperations() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [response] = await client.listOperations(request);

    console.log(`Operations retrieved for parent: ${parent}`);
    if (response.operations) {
      for (const operation of response.operations) {
        console.log(`- Operation: ${operation.name} (${operation.operationType}), Status: ${operation.status}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code) {
      console.error(`API operation failed with code ${err.code}:`, err.message);
    } else {
      console.error('Unexpected error encountered:', err);
    }
    throw err;
  }
}

module.exports = { listOperations };
// [END container_v1beta1_clustermanager_operations_list]
