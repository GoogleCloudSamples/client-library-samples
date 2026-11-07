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

// [START networkservices_v1_networkservices_servicelbpolicy_update]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Updates a ServiceLbPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the ServiceLbPolicy resource. Use 'global'.
 * @param {string} serviceLbPolicyId - The identifier of the ServiceLbPolicy to update.
 */
async function updateServiceLbPolicy(projectId, locationId, serviceLbPolicyId) {
  try {
    const serviceLbPolicy = {
      name: `projects/${projectId}/locations/${locationId}/serviceLbPolicies/${serviceLbPolicyId}`,
      description: 'Updated ServiceLbPolicy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateServiceLbPolicy({
      serviceLbPolicy,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Updated Service LB policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service LB policy not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateServiceLbPolicy };
// [END networkservices_v1_networkservices_servicelbpolicy_update]
