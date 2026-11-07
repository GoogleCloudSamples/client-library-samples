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

// [START networkconnectivity_v1_policybasedroutingservice_policybasedroute_delete]
'use strict';

const {PolicyBasedRoutingServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new PolicyBasedRoutingServiceClient();

/**
 * Use the deletePolicyBasedRoute method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} policyBasedRouteId - The client-assigned ID of the policy-based route.
 */
async function deletePolicyBasedRoute(projectId, policyBasedRouteId) {
  try {
    const name = client.policyBasedRoutePath(projectId, policyBasedRouteId);

    // DeletePolicyBasedRoute initiates a long-running operation.
    const [operation] = await client.deletePolicyBasedRoute({
      name,
    });

    // Wait for the long-running operation to complete.
    await operation.promise();

    console.log(`Deleted policy-based route: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Policy-based route not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deletePolicyBasedRoute };
// [END networkconnectivity_v1_policybasedroutingservice_policybasedroute_delete]
