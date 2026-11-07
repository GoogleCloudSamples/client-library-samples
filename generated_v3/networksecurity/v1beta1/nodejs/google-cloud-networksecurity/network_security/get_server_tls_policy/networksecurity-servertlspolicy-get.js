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

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the getServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region (for example, 'global' or 'us-central1').
 * @param {string} serverTlsPolicyId - The identifier of the ServerTlsPolicy (1-63 characters, matching regex [a-zA-Z0-9_-]+, e.g., 'server_mtls_policy').
 */
async function getServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`;
    const request = {
      name,
    };

    const [response] = await client.getServerTlsPolicy(request);
    console.log(`Server TLS Policy Name: ${response.name}`);
    console.log(`Description: ${response.description}`);
    console.log(`Create Time: ${response.createTime ? response.createTime.seconds : 'N/A'}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServerTlsPolicy };
// [END networksecurity_v1beta1_networksecurity_servertlspolicy_get]
