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

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_create]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a network security authorization policy.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location.
 * @param {string} authorizationPolicyId - The authorization policy ID.
 */
async function createAuthorizationPolicy(projectId, locationId, authorizationPolicyId) {
  const client = new NetworkSecurityClient();

  const parent = `projects/${projectId}/locations/${locationId}`;
  const authorizationPolicy = {
    action: 'ALLOW',
    rules: [
      {
        hosts: ['example.com'],
      },
    ],
  };

  try {
    const request = {
      parent,
      authorizationPolicyId,
      authorizationPolicy,
    };

    const [operation] = await client.createAuthorizationPolicy(request);
    const [response] = await operation.promise();
    console.log(`Authorization policy created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Authorization policy ${authorizationPolicyId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when creating authorization policy: ${err.message}`);
    } else {
      console.error(`Error creating authorization policy: ${err.message}`);
    }
  }
}

module.exports = { createAuthorizationPolicy };
// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_create]
