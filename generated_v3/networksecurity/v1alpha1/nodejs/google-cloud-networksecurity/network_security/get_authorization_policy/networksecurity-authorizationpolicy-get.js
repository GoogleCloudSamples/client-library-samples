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

// [START networksecurity_v1alpha1_networksecurity_authorizationpolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the getAuthorizationPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} authorizationPolicyId - ID of the AuthorizationPolicy (for example, 'example-authorizationpolicy-id')
 */
async function getAuthorizationPolicy(projectId, locationId, authorizationPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/authorizationPolicies/${authorizationPolicyId}`;
    const request = {
      name,
    };

    const [response] = await client.getAuthorizationPolicy(request);

    console.log(`Retrieved authorization policy: ${response.name}`);
    console.log(`Action: ${response.action}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Authorization policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing authorization policy: ${err.message}`);
    } else {
      console.error(`Failed to retrieve authorization policy: ${err.message}`);
    }
  }
}

module.exports = { getAuthorizationPolicy };
// [END networksecurity_v1alpha1_networksecurity_authorizationpolicy_get]
