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

// [START networkservices_v1_networkservices_servicelbpolicy_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Creates a ServiceLbPolicy in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the ServiceLbPolicy is created (for example, 'global' or 'us-central1').
 * @param {string} serviceLbPolicyId - The caller-chosen identifier of the ServiceLbPolicy to create (for example, 'example-service-lb-policy').
 */
async function createServiceLbPolicy(projectId, locationId, serviceLbPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const serviceLbPolicy = {
      description: 'Example Service LB Policy',
      loadBalancingAlgorithm: 'SPRAY_TO_REGION',
    };

    const request = {
      parent,
      serviceLbPolicyId,
      serviceLbPolicy,
    };

    // Service LB Policy creation is a long-running operation
    const [operation] = await client.createServiceLbPolicy(request);
    const [response] = await operation.promise();

    console.log(`Created Service LB Policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service LB Policy ${serviceLbPolicyId} already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating Service LB Policy: ${err.message}`);
    } else {
      console.error(`Failed to create Service LB Policy: ${err.message}`);
    }
  }
}

module.exports = { createServiceLbPolicy };
// [END networkservices_v1_networkservices_servicelbpolicy_create]
