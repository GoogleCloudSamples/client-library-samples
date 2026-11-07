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

// [START networkservices_v1_networkservices_mesh_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Updates an existing Network Services Mesh resource.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Mesh resource.
 * @param {string} locationId - The location of the Mesh resource (for example, 'global').
 * @param {string} meshId - The identifier of the existing Mesh resource to update.
 */
async function updateMesh(projectId, locationId, meshId) {
  try {
    const mesh = {
      name: `projects/${projectId}/locations/${locationId}/meshes/${meshId}`,
      description: 'Updated service mesh description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // Initiate the long-running operation to update the mesh
    const [operation] = await client.updateMesh({
      mesh,
      updateMask,
    });

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Updated Mesh name: ${response.name}`);
    console.log(`Updated Mesh description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mesh resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      console.error(`Failed to update mesh: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateMesh };
// [END networkservices_v1_networkservices_mesh_update]
