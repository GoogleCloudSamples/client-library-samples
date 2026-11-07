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

// [START networkservices_v1_networkservices_tcproute_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the getTcpRoute method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} tcpRouteId - ID of the TcpRoute (for example, 'example-tcproute-id')
 */
async function getTcpRoute(projectId, locationId, tcpRouteId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/tcpRoutes/${tcpRouteId}`;

    const request = {
      name,
    };

    const [tcpRoute] = await client.getTcpRoute(request);
    console.log(`Retrieved TCP Route: ${tcpRoute.name}`);
    return tcpRoute;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TCP Route was not found for ID: ${tcpRouteId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing TCP Route: ${tcpRouteId}`);
    } else {
      console.error(`Failed to retrieve TCP Route: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTcpRoute };
// [END networkservices_v1_networkservices_tcproute_get]
