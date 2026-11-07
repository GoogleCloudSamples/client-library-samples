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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_update]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.BinauthzManagementServiceV1Beta1Client();

/**
 * Updates the Binary Authorization policy for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function updatePolicy(projectId) {
  try {
    // Construct the policy resource using the project path.
    const policy = {
      name: `projects/${projectId}/policy`,
      defaultAdmissionRule: {
        evaluationMode: 'ALWAYS_ALLOW',
        enforcementMode: 'ENFORCED_BLOCK_AND_AUDIT_LOG',
      },
    };

    const [response] = await client.updatePolicy({policy});

    console.log(`Updated policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Policy not found for project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating policy for project ${projectId}.`);
    } else {
      console.error(`Failed to update policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updatePolicy };
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_update]
