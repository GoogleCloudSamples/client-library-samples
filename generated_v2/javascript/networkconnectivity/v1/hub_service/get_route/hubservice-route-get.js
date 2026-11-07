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

// [START networkconnectivity_v1_hubservice_route_get]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the getRoute method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The caller-chosen identifier of the Network Connectivity Center hub.
 * @param {string} routeTableId - The server-generated identifier of the route table, obtained from a ListRouteTables call or associated group.
 * @param {string} routeId - The server-generated identifier of the route, obtained from a ListRoutes call.
 */
async function getRoute(projectId, hubId, routeTableId, routeId) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}/routeTables/${routeTableId}/routes/${routeId}`;
    const request = {
      name,
    };

    const [route] = await client.getRoute(request);

    console.log(`Retrieved route: ${route.name}`);
    console.log(`Destination CIDR range: ${route.destinationCidrRange}`);
    console.log(`Route type: ${route.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Route was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve route: ${err.message}`);
    }
  }
}

module.exports = { getRoute };
// [END networkconnectivity_v1_hubservice_route_get]
