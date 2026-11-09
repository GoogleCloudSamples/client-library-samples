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

// [START networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_create]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha1.NetworkSecurityClient();

/**
 * Creates a gateway security policy.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId Google Cloud region (for example, 'us-central1').
 * @param {string} gatewaySecurityPolicyId Identifier for the GatewaySecurityPolicy (for example, 'example-gatewaysecuritypolicy-id').
 */
async function createGatewaySecurityPolicy(projectId, locationId, gatewaySecurityPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const gatewaySecurityPolicy = {
      description: 'Example Gateway Security Policy',
    };

    const request = {
      parent,
      gatewaySecurityPolicyId,
      gatewaySecurityPolicy,
    };

    // The create operation returns a long-running operation object
    const [operation] = await client.createGatewaySecurityPolicy(request);
    const [response] = await operation.promise();

    console.log(`Created gateway security policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Gateway security policy already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create gateway security policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createGatewaySecurityPolicy };
// [END networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_create]
