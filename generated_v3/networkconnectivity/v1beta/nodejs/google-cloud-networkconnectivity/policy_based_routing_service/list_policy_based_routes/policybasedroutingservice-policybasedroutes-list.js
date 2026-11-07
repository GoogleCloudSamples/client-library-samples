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

// [START networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]
'use strict';

const {PolicyBasedRoutingServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new PolicyBasedRoutingServiceClient();

/**
 * Use the listPolicyBasedRoutes method
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listPolicyBasedRoutes(projectId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const request = {
      parent,
    };

    const [policyBasedRoutes] = await client.listPolicyBasedRoutes(request);
    for (const route of policyBasedRoutes) {
      console.log(`Route name: ${route.name}`);
      console.log(`Network: ${route.network}`);
      console.log(`Priority: ${route.priority}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list policy-based routes: ${err.message}`);
    }
  }
}

module.exports = { listPolicyBasedRoutes };
// [END networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]
