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

// [START cloudasset_v1_assetservice_alliampolicies_search]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Use the searchAllIamPolicies method
 *
 * @param {string} projectId - The caller-chosen identifier of an existing Google Cloud project to search IAM policies within (for example, 'example-project-id').
 */
async function searchAllIamPolicies(projectId) {
  const scope = `projects/${projectId}`;
  try {
    const request = {
      scope,
    };

    // Execute the IAM policy search query across the project scope
    const [policies] = await client.searchAllIamPolicies(request);

    console.log(`Retrieved ${policies.length} IAM policies.`);
    for (const item of policies) {
      console.log(`Resource: ${item.resource}`);
      for (const binding of item.policy?.bindings || []) {
        console.log(`  Role: ${binding.role}`);
      }
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied searching IAM policies for ${scope}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument searching IAM policies: ${err.message}`);
    } else {
      console.error(`Search request failed with gRPC status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { searchAllIamPolicies };
// [END cloudasset_v1_assetservice_alliampolicies_search]
