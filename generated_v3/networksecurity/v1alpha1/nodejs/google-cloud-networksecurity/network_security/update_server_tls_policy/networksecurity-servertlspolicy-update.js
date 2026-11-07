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

// [START networksecurity_v1alpha1_networksecurity_servertlspolicy_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the updateServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or 'global') where the ServerTlsPolicy is located.
 * @param {string} serverTlsPolicyId - The identifier of the existing ServerTlsPolicy to update.
 */
async function updateServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const serverTlsPolicy = {
      name: `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`,
      description: 'Updated description for the Server TLS policy',
    };
    const updateMask = {
      paths: ['description'],
    };

    // UpdateServerTlsPolicy initiates a long-running operation
    const [operation] = await client.updateServerTlsPolicy({
      serverTlsPolicy,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated Server TLS policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateServerTlsPolicy };
// [END networksecurity_v1alpha1_networksecurity_servertlspolicy_update]
