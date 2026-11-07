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

// [START dataform_v1beta1_dataform_iampolicy_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository resides (e.g., 'us-central1').
 * @param {string} repositoryId - The caller-assigned identifier of the Dataform repository.
 */
async function getIamPolicy(projectId, locationId, repositoryId) {
  const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

  try {
    const [policy] = await client.getIamPolicy({
      resource,
    });

    console.log(`Retrieved IAM policy for resource: ${resource}`);
    console.log(`Policy bindings: ${JSON.stringify(policy.bindings, null, 2)}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at: ${resource}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing IAM policy for: ${resource}`);
    } else {
      console.error(`API error retrieving IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END dataform_v1beta1_dataform_iampolicy_get]
