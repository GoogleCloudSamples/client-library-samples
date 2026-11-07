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

// [START networkservices_v1_networkservices_servicelbpolicy_delete]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the deleteServiceLbPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the ServiceLbPolicy resides (for example, 'global' or 'us-central1').
 * @param {string} serviceLbPolicyId - The caller-chosen identifier of the ServiceLbPolicy to delete (for example, 'example-servicelbpolicy-id').
 */
async function deleteServiceLbPolicy(projectId, locationId, serviceLbPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serviceLbPolicies/${serviceLbPolicyId}`;

    // DeleteServiceLbPolicy initiates a long-running operation.
    const [operation] = await client.deleteServiceLbPolicy({name});
    await operation.promise();

    console.log(`Deleted ServiceLbPolicy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`ServiceLbPolicy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting ServiceLbPolicy: ${err.message}`);
    } else {
      console.error(`Failed to delete ServiceLbPolicy: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { deleteServiceLbPolicy };
// [END networkservices_v1_networkservices_servicelbpolicy_delete]
