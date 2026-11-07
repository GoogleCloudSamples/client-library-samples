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

// [START networkservices_v1_networkservices_endpointpolicy_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the updateEndpointPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region ID (e.g., 'global' or a supported region).
 * @param {string} endpointPolicyId - The identifier of the existing EndpointPolicy to update (caller-chosen at creation time).
 */
async function updateEndpointPolicy(projectId, locationId, endpointPolicyId) {
  try {
    const endpointPolicy = {
      name: `projects/${projectId}/locations/${locationId}/endpointPolicies/${endpointPolicyId}`,
      description: 'Updated Endpoint Policy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateEndpointPolicy({
      endpointPolicy,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated endpoint policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint policy not found: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateEndpointPolicy };
// [END networkservices_v1_networkservices_endpointpolicy_update]
