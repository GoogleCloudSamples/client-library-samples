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

// [START artifactregistry_v1beta2_artifactregistry_iampolicy_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region where the repository is located.
 * @param {string} repositoryId - The caller-specified identifier of the existing Artifact Registry repository.
 */
async function getIamPolicy(projectId, locationId, repositoryId) {
  // Construct the repository resource path
  const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

  try {
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for repository: ${resource}`);
    if (policy.bindings && policy.bindings.length > 0) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        console.log(`Members: ${binding.members ? binding.members.join(', ') : 'none'}`);
      }
    } else {
      console.log('No IAM bindings found on the repository.');
    }

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository resource not found: ${resource}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing IAM policy for ${resource}`);
    } else {
      console.error(`Failed to retrieve IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END artifactregistry_v1beta2_artifactregistry_iampolicy_get]
