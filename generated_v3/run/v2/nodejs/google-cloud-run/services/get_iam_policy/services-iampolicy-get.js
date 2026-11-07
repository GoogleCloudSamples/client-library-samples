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

// [START run_v2_services_iampolicy_get]
'use strict';

const {ServicesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Cloud Run service is located.
 * @param {string} serviceId - The unique identifier of the Cloud Run service. User-defined upon service creation.
 */
async function getIamPolicy(projectId, locationId, serviceId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const [policy] = await client.getIamPolicy({
      resource,
    });

    console.log(`Retrieved IAM policy for service: ${resource}`);
    if (policy.bindings && policy.bindings.length > 0) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        if (binding.members) {
          for (const member of binding.members) {
            console.log(`  Member: ${member}`);
          }
        }
      }
    } else {
      console.log('No IAM bindings configured on this service.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving IAM policy: ${err.message}`);
    } else {
      console.error(`Failed to retrieve IAM policy: ${err.message}`);
    }
  }
}

module.exports = { getIamPolicy };
// [END run_v2_services_iampolicy_get]
