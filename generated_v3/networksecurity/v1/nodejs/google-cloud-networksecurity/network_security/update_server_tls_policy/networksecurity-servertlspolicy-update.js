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

// [START networksecurity_v1_networksecurity_servertlspolicy_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the updateServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or 'global' for the ServerTlsPolicy.
 * @param {string} serverTlsPolicyId - The user-defined identifier of the ServerTlsPolicy to update.
 */
async function updateServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const serverTlsPolicy = {
      name: `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      serverTlsPolicy,
      updateMask,
    };

    // UpdateServerTlsPolicy is a long-running operation; wait for resolution
    const [operation] = await client.updateServerTlsPolicy(request);
    const [response] = await operation.promise();

    console.log(`Updated ServerTlsPolicy: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update Server TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateServerTlsPolicy };
// [END networksecurity_v1_networksecurity_servertlspolicy_update]
