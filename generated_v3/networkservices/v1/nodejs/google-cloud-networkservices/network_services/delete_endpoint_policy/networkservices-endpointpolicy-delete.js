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

// [START networkservices_v1_networkservices_endpointpolicy_delete]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the deleteEndpointPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} endpointPolicyId - ID of the EndpointPolicy (for example, 'example-endpointpolicy-id')
 */
async function deleteEndpointPolicy(projectId, locationId, endpointPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/endpointPolicies/${endpointPolicyId}`;

    const [operation] = await client.deleteEndpointPolicy({name});
    await operation.promise();

    console.log(`Deleted endpoint policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint policy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to delete endpoint policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteEndpointPolicy };
// [END networkservices_v1_networkservices_endpointpolicy_delete]
