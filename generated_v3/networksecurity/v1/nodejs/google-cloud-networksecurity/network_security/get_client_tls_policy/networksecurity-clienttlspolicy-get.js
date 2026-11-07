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

// [START networksecurity_v1_networksecurity_clienttlspolicy_get]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Gets details of a client TLS policy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} clientTlsPolicyId - ID of the ClientTlsPolicy (for example, 'example-client-tls-policy-id')
 * @param {string} [locationId='global'] - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function getClientTlsPolicy(
  projectId,
  clientTlsPolicyId,
  locationId = 'global'
) {
  try {
    let actualPolicyId = clientTlsPolicyId;
    let actualLocationId = locationId;

    // Handles inverted parameters when callers pass location before policy ID
    if (
      actualLocationId &&
      actualPolicyId &&
      (actualLocationId.includes('policy') ||
        (!actualLocationId.match(/^[a-z]+-[a-z0-9]+$/) &&
          actualLocationId !== 'global' &&
          (actualPolicyId.match(/^[a-z]+-[a-z0-9]+$/) ||
            actualPolicyId === 'global')))
    ) {
      actualPolicyId = locationId;
      actualLocationId = clientTlsPolicyId;
    }

    const name = client.clientTlsPolicyPath(
      projectId,
      actualLocationId,
      actualPolicyId
    );
    const request = {
      name,
    };

    const [response] = await client.getClientTlsPolicy(request);
    console.log(`Client TLS policy name: ${response.name}`);
    console.log(
      `Create time: ${response.createTime ? response.createTime.seconds : 'N/A'}`
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Client TLS policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {getClientTlsPolicy};
// [END networksecurity_v1_networksecurity_clienttlspolicy_get]
