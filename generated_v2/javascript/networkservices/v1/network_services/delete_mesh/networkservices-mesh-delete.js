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

// [START networkservices_v1_networkservices_mesh_delete]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the deleteMesh method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or location where the mesh is defined (for example, 'global').
 * @param {string} meshId - The caller-specified identifier of the Mesh to delete (for example, 'example-mesh-id').
 */
async function deleteMesh(projectId, locationId, meshId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/meshes/${meshId}`;

    // DeleteMesh initiates a long-running operation
    const [operation] = await client.deleteMesh({name});

    // Wait for the long-running operation to complete
    await operation.promise();

    console.log(`Deleted mesh: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mesh not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteMesh };
// [END networkservices_v1_networkservices_mesh_delete]
