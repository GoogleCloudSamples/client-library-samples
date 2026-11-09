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

// [START networkservices_v1_networkservices_meshrouteview_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the getMeshRouteView method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} meshId - The ID of the Mesh resource (for example, 'example-mesh').
 * @param {string} routeViewId - The ID of the MeshRouteView resource, which is server-generated and obtainable by listing route views via ListMeshRouteViews.
 */
async function getMeshRouteView(projectId, locationId, meshId, routeViewId) {
  const name = `projects/${projectId}/locations/${locationId}/meshes/${meshId}/routeViews/${routeViewId}`;

  try {
    const request = {
      name,
    };

    const [response] = await client.getMeshRouteView(request);

    console.log(`Retrieved MeshRouteView: ${response.name}`);
    console.log(`Route type: ${response.routeType}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`MeshRouteView not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing MeshRouteView: ${name}`);
    } else {
      console.error(`API error retrieving MeshRouteView: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMeshRouteView };
// [END networkservices_v1_networkservices_meshrouteview_get]
