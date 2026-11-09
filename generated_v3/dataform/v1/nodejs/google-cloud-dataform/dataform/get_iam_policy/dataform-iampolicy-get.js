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

// [START dataform_v1_dataform_iampolicy_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dataform repository location or region.
 * @param {string} repositoryId - The ID of the Dataform repository.
 */
async function getIamPolicy(projectId, locationId, repositoryId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    if (policy.bindings && policy.bindings.length > 0) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        console.log(`Members: ${binding.members ? binding.members.join(', ') : 'None'}`);
      }
    } else {
      console.log('No IAM bindings found on this resource.');
    }

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at: projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving IAM policy for: projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`);
    } else {
      console.error(`Failed to retrieve IAM policy: ${err.message}`);
    }
  }
}

module.exports = { getIamPolicy };
// [END dataform_v1_dataform_iampolicy_get]
