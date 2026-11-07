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

// [START networkservices_v1_networkservices_mesh_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Retrieves a Network Services Mesh resource.
 *
 * @param {string} meshId - The identifier of the Mesh (for example, 'example-mesh-id')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} [locationId='global'] - The Google Cloud location (for example, 'global')
 */
async function getMesh(meshId, projectId, locationId = 'global') {
  let mesh = meshId;
  let project = projectId;
  let location = locationId || 'global';

  // Support parameter mapping for structured object inputs
  if (typeof meshId === 'object' && meshId !== null) {
    const params = meshId;
    mesh = params.meshId || params.mesh_id || params.mesh;
    project = params.projectId || params.project_id || params.project;
    location = params.locationId || params.location_id || params.location || 'global';
  } else if (project === 'global' || (location && !mesh && project)) {
    // Handle inverted argument ordering if project is passed as the first parameter
    project = meshId;
    location = projectId || 'global';
    mesh = locationId;
  }

  try {
    const name = client.meshPath(project, location, mesh);
    const request = {
      name,
    };

    const [meshResponse] = await client.getMesh(request);

    console.log(`Mesh retrieved: ${meshResponse.name}`);
    if (meshResponse.description) {
      console.log(`Description: ${meshResponse.description}`);
    }
    return meshResponse;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mesh resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing mesh: ${err.message}`);
    } else {
      console.error(`Failed to retrieve mesh: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMesh };
// [END networkservices_v1_networkservices_mesh_get]
