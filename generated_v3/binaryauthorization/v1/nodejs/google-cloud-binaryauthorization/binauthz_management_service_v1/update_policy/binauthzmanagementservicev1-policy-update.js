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

// [START binaryauthorization_v1_binauthzmanagementservicev1_policy_update]
'use strict';

const {BinauthzManagementServiceV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new BinauthzManagementServiceV1Client();

/**
 * Use the updatePolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function updatePolicy(projectId) {
  try {
    const policy = {
      name: client.projectPolicyPath(projectId),
      description: 'Updated policy configuration',
      defaultAdmissionRule: {
        evaluationMode: 'ALWAYS_ALLOW',
        enforcementMode: 'ENFORCED_BLOCK_AND_AUDIT_LOG',
      },
    };

    const request = {
      policy: policy,
    };

    const [response] = await client.updatePolicy(request);
    console.log(`Updated policy: ${response.name}`);
    console.log(`Default admission rule evaluation mode: ${response.defaultAdmissionRule.evaluationMode}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update policy: ${err.message}`);
    }
  }
}

module.exports = { updatePolicy };
// [END binaryauthorization_v1_binauthzmanagementservicev1_policy_update]
