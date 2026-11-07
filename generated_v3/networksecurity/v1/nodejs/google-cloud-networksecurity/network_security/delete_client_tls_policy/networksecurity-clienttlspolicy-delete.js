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

// [START networksecurity_v1_networksecurity_clienttlspolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the deleteClientTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (region or 'global') where the ClientTlsPolicy resides (for example, 'global' or 'us-central1').
 * @param {string} clientTlsPolicyId - The identifier of the ClientTlsPolicy to delete (for example, 'client_mtls_policy'). This ID is caller-chosen at creation time.
 */
async function deleteClientTlsPolicy(projectId, locationId, clientTlsPolicyId) {
  const name = `projects/${projectId}/locations/${locationId}/clientTlsPolicies/${clientTlsPolicyId}`;

  try {
    // DeleteClientTlsPolicy is a long-running operation; wait for it to complete.
    const [operation] = await client.deleteClientTlsPolicy({name});
    await operation.promise();

    console.log(`Deleted Client TLS policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Client TLS policy not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Client TLS policy is still in use: ${err.message}`);
    } else {
      console.error(`Failed to delete client TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteClientTlsPolicy };
// [END networksecurity_v1_networksecurity_clienttlspolicy_delete]
