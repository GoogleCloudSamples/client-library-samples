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

// [START networkservices_v1_networkservices_servicelbpolicy_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Retrieves a ServiceLbPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the ServiceLbPolicy is defined (for example, 'global').
 * @param {string} serviceLbPolicyId - The client-assigned identifier of the ServiceLbPolicy to retrieve (for example, 'example-service-lb-policy').
 */
async function getServiceLbPolicy(projectId, locationId, serviceLbPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serviceLbPolicies/${serviceLbPolicyId}`;
    const [serviceLbPolicy] = await client.getServiceLbPolicy({name});

    console.log(`Service LB policy name: ${serviceLbPolicy.name}`);
    return serviceLbPolicy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service LB policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve Service LB policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServiceLbPolicy };
// [END networkservices_v1_networkservices_servicelbpolicy_get]
