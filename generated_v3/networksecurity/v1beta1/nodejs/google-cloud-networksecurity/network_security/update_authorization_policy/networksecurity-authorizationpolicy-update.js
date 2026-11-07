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

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the updateAuthorizationPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (e.g., 'global' or a supported region).
 * @param {string} authorizationPolicyId - The ID of the AuthorizationPolicy to update. Must be 1-63 characters, containing only letters, numbers, hyphens, and underscores, and not start with a number.
 */
async function updateAuthorizationPolicy(projectId, locationId, authorizationPolicyId) {
  try {
    const authorizationPolicy = {
      name: `projects/${projectId}/locations/${locationId}/authorizationPolicies/${authorizationPolicyId}`,
      description: 'Updated authorization policy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      authorizationPolicy,
      updateMask,
    };

    const [operation] = await client.updateAuthorizationPolicy(request);
    const [response] = await operation.promise();

    console.log(`Updated authorization policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Authorization policy resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update authorization policy: ${err.message}`);
    }
  }
}

module.exports = { updateAuthorizationPolicy };
// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_update]
