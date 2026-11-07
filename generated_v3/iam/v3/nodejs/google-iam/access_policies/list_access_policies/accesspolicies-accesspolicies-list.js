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

// [START iam_v3_accesspolicies_accesspolicies_list]
'use strict';

const {AccessPoliciesClient} = require('@google-cloud/iam').v3;
const {status} = require('@grpc/grpc-js');

const client = new AccessPoliciesClient();

/**
 * Lists IAM access policies.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 */
async function listAccessPolicies(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [policies] = await client.listAccessPolicies({
      parent,
    });

    if (!policies || policies.length === 0) {
      console.log('No access policies found.');
      return;
    }

    for (const policy of policies) {
      console.log(`Access Policy: ${policy.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error listing access policies: ${err.message}`);
    }
  }
}

module.exports = { listAccessPolicies };
// [END iam_v3_accesspolicies_accesspolicies_list]
