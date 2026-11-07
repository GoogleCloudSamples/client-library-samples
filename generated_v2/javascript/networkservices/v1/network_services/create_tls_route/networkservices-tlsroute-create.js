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

// [START networkservices_v1_networkservices_tlsroute_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Creates a TLS route resource using the createTlsRoute method.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (region or 'global') where the TlsRoute is defined.
 * @param {string} tlsRouteId - Caller-chosen identifier of the TlsRoute to create (for example, 'example-tls-route').
 * @param {string} backendServiceId - The identifier of an existing BackendService to route traffic to (for example, 'example-backend-service').
 */
async function createTlsRoute(projectId, locationId, tlsRouteId, backendServiceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const destination = {
      serviceName: `projects/${projectId}/locations/${locationId}/backendServices/${backendServiceId}`,
      weight: 1,
    };

    const routeRule = {
      matches: [
        {
          sniHost: ['example.com'],
        },
      ],
      action: {
        destinations: [destination],
      },
    };

    const tlsRoute = {
      rules: [routeRule],
    };

    const request = {
      parent,
      tlsRouteId,
      tlsRoute,
    };

    // Initialize long-running operation to create the TLS Route
    const [operation] = await client.createTlsRoute(request);
    const [response] = await operation.promise();

    console.log(`Created TLS route: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TLS route ${tlsRouteId} already exists:`, err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied creating TLS route:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource location or parent not found:', err.message);
    } else {
      console.error('Failed to create TLS route:', err.message);
    }
    throw err;
  }
}

module.exports = { createTlsRoute };
// [END networkservices_v1_networkservices_tlsroute_create]
