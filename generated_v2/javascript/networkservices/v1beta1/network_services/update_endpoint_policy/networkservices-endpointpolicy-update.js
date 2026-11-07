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

// [START networkservices_v1beta1_networkservices_endpointpolicy_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the updateEndpointPolicy method
 *
 * @param {string} projectId - The ID of the Google Cloud project.
 * @param {string} locationId - The location of the EndpointPolicy (typically 'global').
 * @param {string} endpointPolicyId - The resource ID of the EndpointPolicy to update.
 */
async function updateEndpointPolicy(projectId, locationId, endpointPolicyId) {
  try {
    const endpointPolicy = {
      name: `projects/${projectId}/locations/${locationId}/endpointPolicies/${endpointPolicyId}`,
      description: 'Updated description for example endpoint policy',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      endpointPolicy,
      updateMask,
    };

    // Initiate the long-running operation to update the endpoint policy
    const [operation] = await client.updateEndpointPolicy(request);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Endpoint policy updated: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error [${err.code}]: ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateEndpointPolicy };
// [END networkservices_v1beta1_networkservices_endpointpolicy_update]
