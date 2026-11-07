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

// [START networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Deletes a gateway security policy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} gatewaySecurityPolicyId - ID of the GatewaySecurityPolicy (for example, 'example-gatewaysecuritypolicy-id')
 */
async function deleteGatewaySecurityPolicy(projectId, locationId, gatewaySecurityPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/gatewaySecurityPolicies/${gatewaySecurityPolicyId}`;

    const [operation] = await client.deleteGatewaySecurityPolicy({
      name,
    });
    await operation.promise();

    console.log(`Deleted gateway security policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Gateway security policy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Policy cannot be deleted due to a failed precondition: ${err.message}`);
    } else {
      console.error(`Failed to delete gateway security policy: ${err.message}`);
    }
  }
}

module.exports = { deleteGatewaySecurityPolicy };
// [END networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicy_delete]
