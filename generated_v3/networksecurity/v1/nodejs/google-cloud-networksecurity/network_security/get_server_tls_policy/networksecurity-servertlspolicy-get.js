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

// [START networksecurity_v1_networksecurity_servertlspolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the getServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serverTlsPolicyId - ID of the ServerTlsPolicy (for example, 'example-servertlspolicy-id')
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
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing Server TLS policy: ${err.message}`);
    } else {
      console.error(`Failed to retrieve Server TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServerTlsPolicy };
// [END networksecurity_v1_networksecurity_servertlspolicy_get]
