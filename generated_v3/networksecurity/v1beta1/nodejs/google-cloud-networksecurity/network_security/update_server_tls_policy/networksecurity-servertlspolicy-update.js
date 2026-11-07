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

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_update]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the updateServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region (for example, 'global' or a regional location).
 * @param {string} serverTlsPolicyId - The caller-chosen identifier of the existing ServerTlsPolicy to update.
 */
async function updateServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const serverTlsPolicy = {
      name: `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`,
      description: 'Updated server TLS policy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateServerTlsPolicy({
      serverTlsPolicy,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated server TLS policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update server TLS policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateServerTlsPolicy };
// [END networksecurity_v1beta1_networksecurity_servertlspolicy_update]
