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

// [START clouddeploy_v1_clouddeploy_deploypolicy_delete]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Deletes a deploy policy in Google Cloud Deploy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the deploy policy is located (for example, 'us-central1').
 * @param {string} deployPolicyId - The ID of the deploy policy to delete (for example, 'example-policy-id').
 */
async function deleteDeployPolicy(projectId, locationId, deployPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deployPolicies/${deployPolicyId}`;

    const request = {
      name,
      allowMissing: true,
    };

    const [operation] = await client.deleteDeployPolicy(request);
    console.log(`Waiting for operation ${operation.name} to complete...`);
    await operation.promise();

    console.log(`Deleted deploy policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Deploy policy not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Failed to delete deploy policy: ${err.message}`);
    }
  }
}

module.exports = { deleteDeployPolicy };
// [END clouddeploy_v1_clouddeploy_deploypolicy_delete]
