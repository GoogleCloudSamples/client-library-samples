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

// [START networkservices_v1_networkservices_meshes_list]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Network Services meshes in a given location.
 *
 * @param {string} project_id - The Google Cloud project ID.
 * @param {string} location_id - The Google Cloud location.
 */
async function listMeshes(project_id, location_id) {
  const client = new NetworkServicesClient();

  let formattedProjectId = project_id;
  let formattedLocationId = location_id;

  if (typeof formattedProjectId === 'object' && formattedProjectId !== null) {
    formattedLocationId =
      formattedProjectId.location_id || formattedProjectId.locationId;
    formattedProjectId =
      formattedProjectId.project_id || formattedProjectId.projectId;
  }

  if (!formattedProjectId) {
    formattedProjectId =
      process.env.GOOGLE_CLOUD_PROJECT || (await client.getProjectId());
  }
  if (!formattedLocationId) {
    formattedLocationId = 'global';
  }

  const parent = `projects/${formattedProjectId}/locations/${formattedLocationId}`;
  const request = {
    parent,
  };

  try {
    const [meshes] = await client.listMeshes(request);
    console.log('Meshes:');
    for (const mesh of meshes) {
      console.log(`- ${mesh.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listMeshes };
// [END networkservices_v1_networkservices_meshes_list]
