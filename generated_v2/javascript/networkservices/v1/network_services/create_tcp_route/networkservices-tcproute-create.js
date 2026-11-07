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

// [START networkservices_v1_networkservices_tcproute_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createTcpRoute method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global' or 'us-central1').
 * @param {string} tcpRouteId - Caller-chosen identifier of the TcpRoute to be created (for example, 'example-tcp-route').
 * @param {string} backendServiceId - Identifier of the Compute Engine BackendService to route traffic to (for example, 'example-backend-service'). Caller-supplied identifier of an existing resource.
 */
async function createTcpRoute(projectId, locationId, tcpRouteId, backendServiceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const backendService = `projects/${projectId}/locations/${locationId}/backendServices/${backendServiceId}`;

    const tcpRoute = {
      rules: [
        {
          matches: [
            {
              port: '8080',
            },
          ],
          action: {
            destinations: [
              {
                serviceName: backendService,
                weight: 1,
              },
            ],
          },
        },
      ],
    };

    const request = {
      parent,
      tcpRouteId,
      tcpRoute,
    };

    const [operation] = await client.createTcpRoute(request);
    const [response] = await operation.promise();

    console.log(`TCP Route created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`TCP Route ${tcpRouteId} already exists:`, err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when creating TCP Route:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid arguments supplied for TCP Route:', err.message);
    } else {
      console.error('Failed to create TCP Route:', err.message);
      throw err;
    }
  }
}

module.exports = { createTcpRoute };
// [END networkservices_v1_networkservices_tcproute_create]
