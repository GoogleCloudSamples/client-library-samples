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

// [START networkconnectivity_v1beta_policybasedroutingservice_policybasedroute_create]
'use strict';

const {PolicyBasedRoutingServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new PolicyBasedRoutingServiceClient();

/**
 * Creates a policy-based route in Google Cloud Network Connectivity.
 *
 * @param {string} policyBasedRouteId - The identifier for the policy-based route (for example, 'example-policy-based-route-id').
 */
async function createPolicyBasedRoute(policyBasedRouteId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;
    const network = `projects/${projectId}/global/networks/default`;

    const policyBasedRoute = {
      network,
      filter: {
        protocolVersion: 'IPV4',
        ipProtocol: 'TCP',
        destRange: '0.0.0.0/0',
      },
      nextHopOtherRoutes: 'DEFAULT_ROUTING',
      priority: 1,
    };

    const request = {
      parent,
      policyBasedRouteId,
      policyBasedRoute,
    };

    const [operation] = await client.createPolicyBasedRoute(request);
    const [response] = await operation.promise();

    console.log(`Created policy-based route: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Policy-based route already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid route configuration: ${err.message}`);
    } else {
      console.error(`Failed to create policy-based route: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createPolicyBasedRoute };
// [END networkconnectivity_v1beta_policybasedroutingservice_policybasedroute_create]
