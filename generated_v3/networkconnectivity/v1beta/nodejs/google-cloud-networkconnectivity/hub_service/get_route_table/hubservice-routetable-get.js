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

// [START networkconnectivity_v1beta_hubservice_routetable_get]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the getRouteTable method
 *
 * @param {string} projectId - The Google Cloud project ID containing the Network Connectivity Center hub.
 * @param {string} hubId - The identifier of the Network Connectivity Center hub.
 * @param {string} routeTableId - The identifier of the route table to retrieve.
 */
async function getRouteTable(projectId, hubId, routeTableId) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}/routeTables/${routeTableId}`;
    const request = {
      name,
    };

    const [response] = await client.getRouteTable(request);

    console.log(`Route table: ${response.name}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Route table not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve route table: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRouteTable };
// [END networkconnectivity_v1beta_hubservice_routetable_get]
