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

// [START networksecurity_v1beta1_networksecurity_clienttlspolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Deletes a ClientTlsPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1')
 * @param {string} clientTlsPolicyId - The Client TLS policy ID (for example, 'example-clienttlspolicy-id')
 */
async function deleteClientTlsPolicy(projectId, locationId, clientTlsPolicyId) {
  try {
    const name = client.clientTlsPolicyPath(
      projectId,
      locationId,
      clientTlsPolicyId
    );

    const [operation] = await client.deleteClientTlsPolicy({
      name,
    });
    await operation.promise();
    console.log(`Deleted Client TLS policy: ${clientTlsPolicyId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Client TLS policy ${clientTlsPolicyId} not found.`);
    } else {
      console.error(`Failed to delete Client TLS policy: ${err.message}`);
    }
  }
}

module.exports = { deleteClientTlsPolicy };
// [END networksecurity_v1beta1_networksecurity_clienttlspolicy_delete]
