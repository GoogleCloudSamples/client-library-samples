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

// [START container_v1_clustermanager_operation_get]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the getOperation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone of the operation (for example, 'us-central1' or 'us-central1-a').
 * @param {string} operationId - The server-assigned ID of the operation.
 */
async function getOperation(projectId, locationId, operationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/operations/${operationId}`;
    const request = {
      name,
    };

    const [operation] = await client.getOperation(request);

    console.log(`Operation Name: ${operation.name}`);
    console.log(`Status: ${operation.status}`);
    console.log(`Type: ${operation.operationType}`);
    return operation;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Operation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to get operation: ${err.message}`);
    }
  }
}

module.exports = { getOperation };
// [END container_v1_clustermanager_operation_get]
