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

// [START networksecurity_v1_networksecurity_clienttlspolicy_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Updates a ClientTlsPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the ClientTlsPolicy (for example, 'global' or a supported region).
 * @param {string} clientTlsPolicyId - The identifier of the ClientTlsPolicy to update.
 */
async function updateClientTlsPolicy(projectId, locationId, clientTlsPolicyId) {
  try {
    const clientTlsPolicy = {
      name: `projects/${projectId}/locations/${locationId}/clientTlsPolicies/${clientTlsPolicyId}`,
      description: 'Updated client TLS policy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // ClientTlsPolicy updates are long-running operations.
    const [operation] = await client.updateClientTlsPolicy({
      clientTlsPolicy,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated Client TLS policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Client TLS policy not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else {
      console.error(`Failed to update Client TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateClientTlsPolicy };
// [END networksecurity_v1_networksecurity_clienttlspolicy_update]
