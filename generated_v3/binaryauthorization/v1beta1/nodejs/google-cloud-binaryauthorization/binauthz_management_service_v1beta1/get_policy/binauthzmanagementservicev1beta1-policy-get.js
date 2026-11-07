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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.BinauthzManagementServiceV1Beta1Client();

/**
 * Retrieves the Binary Authorization policy for a project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function getPolicy(projectId) {
  try {
    // Construct the resource name for the project policy.
    const name = `projects/${projectId}/policy`;

    const request = {
      name,
    };

    const [policy] = await client.getPolicy(request);

    console.log(`Retrieved policy: ${policy.name}`);
    console.log(`Default admission rule evaluation mode: ${policy.defaultAdmissionRule?.evaluationMode}`);
    console.log(`Default admission rule enforcement mode: ${policy.defaultAdmissionRule?.enforcementMode}`);

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Policy not found for project ${projectId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${projectId}: ${err.message}`);
    } else {
      console.error(`API error retrieving policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPolicy };
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
