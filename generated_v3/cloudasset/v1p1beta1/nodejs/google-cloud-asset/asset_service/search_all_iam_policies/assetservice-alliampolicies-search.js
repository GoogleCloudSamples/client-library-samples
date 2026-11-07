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

// [START cloudasset_v1p1beta1_assetservice_alliampolicies_search]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Searches IAM policies within a specified Google Cloud project scope.
 *
 * @param {string} projectId - The Google Cloud project ID to search IAM policies within.
 */
async function searchAllIamPolicies(projectId) {
  try {
    const scope = `projects/${projectId}`;
    const request = {
      scope,
    };

    const [policies] = await client.searchAllIamPolicies(request);
    for (const item of policies) {
      console.log(`Resource: ${item.resource}`);
    }
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.PERMISSION_DENIED ||
      err.code === status.NOT_FOUND
    ) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { searchAllIamPolicies };
// [END cloudasset_v1p1beta1_assetservice_alliampolicies_search]
