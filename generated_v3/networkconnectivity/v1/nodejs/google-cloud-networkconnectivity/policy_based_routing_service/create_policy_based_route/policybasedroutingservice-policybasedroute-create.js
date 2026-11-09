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

// [START networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
'use strict';

const {PolicyBasedRoutingServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new PolicyBasedRoutingServiceClient();

/**
 * Use the createPolicyBasedRoute method
 *
 * @param {string} policyBasedRouteId - The client-assigned ID for the PolicyBasedRoute.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} networkId - The name or ID of an existing VPC network.
 */
async function createPolicyBasedRoute(policyBasedRouteId, projectId, networkId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const policyBasedRoute = {
      network: `projects/${projectId}/global/networks/${networkId}`,
      filter: {
        protocolVersion: 'IPV4',
        ipProtocol: 'ALL',
      },
      nextHopOtherRoutes: 'DEFAULT_ROUTING',
    };

    // Initiates the creation of a policy-based route as a long-running operation
    const [operation] = await client.createPolicyBasedRoute({
      parent,
      policyBasedRouteId,
      policyBasedRoute,
    });

    // Waits for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Created policy-based route: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Policy-based route already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createPolicyBasedRoute };
// [END networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
