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

// [START networkservices_v1_networkservices_meshrouteviews_list]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Lists MeshRouteView resources for a Mesh.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud location where the Mesh is located (for example, 'global').
 * @param {string} meshId - Identifier of the Mesh resource (for example, 'example-mesh-id').
 */
async function listMeshRouteViews(projectId, locationId, meshId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/meshes/${meshId}`;
    const request = {
      parent,
    };

    const [routeViews] = await client.listMeshRouteViews(request);
    if (!routeViews || routeViews.length === 0) {
      console.log('No mesh route views found.');
    } else {
      for (const routeView of routeViews) {
        console.log(`Mesh route view name: ${routeView.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mesh not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listMeshRouteViews };
// [END networkservices_v1_networkservices_meshrouteviews_list]
