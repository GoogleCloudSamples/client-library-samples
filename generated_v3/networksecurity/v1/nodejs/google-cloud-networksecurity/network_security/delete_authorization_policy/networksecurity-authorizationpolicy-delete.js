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

// [START networksecurity_v1_networksecurity_authorizationpolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the deleteAuthorizationPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} authorizationPolicyId - Caller-chosen identifier of the AuthorizationPolicy to delete (for example, 'authz_policy').
 */
async function deleteAuthorizationPolicy(projectId, locationId, authorizationPolicyId) {
  const name = `projects/${projectId}/locations/${locationId}/authorizationPolicies/${authorizationPolicyId}`;

  try {
    // Initiate deletion and wait for the long-running operation to complete
    const [operation] = await client.deleteAuthorizationPolicy({name});
    await operation.promise();

    console.log(`Deleted authorization policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Authorization policy not found: ${err.message}`);
      return;
    }
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
      return;
    }
    console.error(`Failed to delete authorization policy: ${err.message}`);
    throw err;
  }
}

module.exports = { deleteAuthorizationPolicy };
// [END networksecurity_v1_networksecurity_authorizationpolicy_delete]
