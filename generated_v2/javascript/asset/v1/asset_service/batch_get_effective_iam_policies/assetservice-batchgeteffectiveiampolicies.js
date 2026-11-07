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

// [START cloudasset_v1_assetservice_batch_get_effective_iam_policies]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Use the batchGetEffectiveIamPolicies method
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function batchGetEffectiveIamPolicies(projectId) {
  try {
    const names = [`//cloudresourcemanager.googleapis.com/projects/${projectId}`];
    const scope = `projects/${projectId}`;

    const request = {
      scope,
      names,
    };

    const [response] = await client.batchGetEffectiveIamPolicies(request);
    console.log('Effective IAM policies retrieved successfully.');
    for (const policyResult of response.policyResults || []) {
      console.log(`Resource: ${policyResult.fullResourceName}`);
      for (const policyInfo of policyResult.policies || []) {
        console.log(`Attached resource: ${policyInfo.attachedResource}`);
      }
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing policies: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { batchGetEffectiveIamPolicies };
// [END cloudasset_v1_assetservice_batch_get_effective_iam_policies]
