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

// [START networksecurity_v1alpha1_networksecurity_clienttlspolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the getClientTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} clientTlsPolicyId - The client-assigned ID of the ClientTlsPolicy to retrieve (e.g., 'client_mtls_policy'). Must be 1-63 characters containing only letters, numbers, hyphens, and underscores, and not starting with a number.
 */
async function getClientTlsPolicy(projectId, locationId, clientTlsPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clientTlsPolicies/${clientTlsPolicyId}`;
    const request = {
      name,
    };

    const [response] = await client.getClientTlsPolicy(request);
    console.log(`Retrieved Client TLS Policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getClientTlsPolicy };
// [END networksecurity_v1alpha1_networksecurity_clienttlspolicy_get]
