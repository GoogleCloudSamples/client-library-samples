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

// [START networksecurity_v1alpha1_networksecurity_servertlspolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the getServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the ServerTlsPolicy is located (for example, 'global' or 'us-central1').
 * @param {string} serverTlsPolicyId - The caller-specified identifier of the ServerTlsPolicy to retrieve (for example, 'server-mtls-policy'). Must be 1-63 characters containing only letters, numbers, hyphens, and underscores, and not begin with a digit.
 */
async function getServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`;
    const request = {
      name,
    };

    const [response] = await client.getServerTlsPolicy(request);

    console.log(`Retrieved Server TLS policy: ${response.name}`);
    if (response.description) {
      console.log(`Description: ${response.description}`);
    }
    if (response.serverCertificate) {
      console.log('Server certificate is configured.');
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found at: projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing Server TLS policy at: projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`);
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServerTlsPolicy };
// [END networksecurity_v1alpha1_networksecurity_servertlspolicy_get]
