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

// [START networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves details of a specific gateway security policy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1').
 * @param {string} gatewaySecurityPolicyId - The gateway security policy ID (for example, 'example-gatewaysecuritypolicy-id').
 */
async function getGatewaySecurityPolicy(projectId, locationId, gatewaySecurityPolicyId) {
  const client = new NetworkSecurityClient();
  const name = `projects/${projectId}/locations/${locationId}/gatewaySecurityPolicies/${gatewaySecurityPolicyId}`;

  try {
    const request = {
      name,
    };

    const [response] = await client.getGatewaySecurityPolicy(request);

    console.log(`Gateway security policy name: ${response.name}`);
    console.log(`Gateway security policy description: ${response.description || 'None'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Gateway security policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error retrieving gateway security policy: ${err.message}`);
    }
  }
}

module.exports = { getGatewaySecurityPolicy };
// [END networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_get]
