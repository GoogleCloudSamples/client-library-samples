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

// [START networkservices_v1_networkservices_mesh_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createMesh method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} meshId - ID of the Mesh (for example, 'example-mesh-id')
 */
async function createMesh(projectId, locationId, meshId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const mesh = {
      description: 'Example Network Services Mesh',
    };

    const request = {
      parent,
      meshId,
      mesh,
    };

    const [operation] = await client.createMesh(request);
    const [response] = await operation.promise();

    console.log(`Created mesh: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Mesh already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create mesh: ${err.message}`);
    }
  }
}

module.exports = { createMesh };
// [END networkservices_v1_networkservices_mesh_create]
