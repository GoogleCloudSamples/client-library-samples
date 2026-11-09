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

// [START networkservices_v1_networkservices_tcproute_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Updates an existing TCP route.
 *
 * @param {string} projectId - Google Cloud project ID where the TcpRoute is located.
 * @param {string} locationId - Google Cloud location for the TcpRoute (for example, "global").
 * @param {string} tcpRouteId - Identifier of the existing TcpRoute to update.
 */
async function updateTcpRoute(projectId, locationId, tcpRouteId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/tcpRoutes/${tcpRouteId}`;

    // Retrieve existing route to preserve required routing rules during update validation
    const [existingRoute] = await client.getTcpRoute({name});

    const tcpRoute = {
      name,
      description: 'Updated TCP route description',
      rules: existingRoute.rules,
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateTcpRoute({
      tcpRoute,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Updated TCP route: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TCP route not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to update TCP route: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTcpRoute };
// [END networkservices_v1_networkservices_tcproute_update]
