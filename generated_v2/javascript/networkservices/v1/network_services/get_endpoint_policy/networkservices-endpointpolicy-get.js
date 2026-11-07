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

// [START networkservices_v1_networkservices_endpointpolicy_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

/**
 * Gets details of a specific EndpointPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1')
 * @param {string} endpointPolicyId - ID of the EndpointPolicy (for example, 'example-endpointpolicy-id')
 */
async function getEndpointPolicy(projectId, locationId, endpointPolicyId) {
  const client = new NetworkServicesClient();

  try {
    const name = `projects/${projectId}/locations/${locationId}/endpointPolicies/${endpointPolicyId}`;

    const request = {
      name,
    };

    const [response] = await client.getEndpointPolicy(request);
    console.log(`Retrieved endpoint policy: ${response.name}`);
    console.log(`Endpoint policy type: ${response.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing endpoint policy: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { getEndpointPolicy };
// [END networkservices_v1_networkservices_endpointpolicy_get]
