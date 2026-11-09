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

// [START networkservices_v1_networkservices_tlsroute_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Updates an existing TlsRoute resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the TlsRoute resource (for example, 'global').
 * @param {string} tlsRouteId - The identifier of the TlsRoute to update.
 */
async function updateTlsRoute(projectId, locationId, tlsRouteId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/tlsRoutes/${tlsRouteId}`;

    // Retrieve the existing route to preserve required schema fields such as rules
    const [existingRoute] = await client.getTlsRoute({name});

    const tlsRoute = {
      name,
      description: 'Updated TLS route description',
      rules: existingRoute.rules,
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateTlsRoute({
      tlsRoute,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated TLS route: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TlsRoute resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to update TlsRoute: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTlsRoute };
// [END networkservices_v1_networkservices_tlsroute_update]
