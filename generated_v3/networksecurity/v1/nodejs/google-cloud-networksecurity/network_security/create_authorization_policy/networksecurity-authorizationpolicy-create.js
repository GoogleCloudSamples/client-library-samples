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

// [START networksecurity_v1_networksecurity_authorizationpolicy_create]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Creates a Network Security authorization policy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} authorizationPolicyId - The authorization policy identifier (for example, 'example-authorization-policy-id')
 */
async function createAuthorizationPolicy(projectId, locationId, authorizationPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const authorizationPolicy = {
      action: 'ALLOW',
      rules: [
        {
          sources: [
            {
              principals: ['spiffe://example.com/ns/default/sa/example-sa'],
            },
          ],
        },
      ],
    };

    const request = {
      parent,
      authorizationPolicyId,
      authorizationPolicy,
    };

    const [operation] = await client.createAuthorizationPolicy(request);
    const [response] = await operation.promise();

    console.log(`Created authorization policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Authorization policy already exists: ${err.message}`);
    } else {
      console.error(`Failed to create authorization policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAuthorizationPolicy };
// [END networksecurity_v1_networksecurity_authorizationpolicy_create]
