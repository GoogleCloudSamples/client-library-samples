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

// [START networkconnectivity_v1beta_hubservice_routes_list]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the listRoutes method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub.
 * @param {string} routeTableId - The ID of the route table within the hub.
 */
async function listRoutes(projectId, hubId, routeTableId) {
  try {
    const parent = `projects/${projectId}/locations/global/hubs/${hubId}/routeTables/${routeTableId}`;

    const request = {
      parent,
    };

    const [routes] = await client.listRoutes(request);

    for (const route of routes) {
      console.log(`Route name: ${route.name}`);
      console.log(`Destination CIDR: ${route.destinationCidrRange}`);
      console.log(`Type: ${route.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API execution error: ${err.message || err}`);
    }
  }
}

module.exports = { listRoutes };
// [END networkconnectivity_v1beta_hubservice_routes_list]
