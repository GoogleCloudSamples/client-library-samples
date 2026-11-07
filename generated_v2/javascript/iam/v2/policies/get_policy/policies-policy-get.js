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

// [START iam_v2_policies_policy_get]
'use strict';

const {PoliciesClient} = require('@google-cloud/iam');
const {status} = require('@grpc/grpc-js');

const client = new PoliciesClient();

/**
 * Retrieves a policy by ID and attachment point ID.
 *
 * @param {string} policyId - ID of the Policy (for example, 'example-policy-id').
 * @param {string} attachmentPointId - ID of the AttachmentPoint (for example, 'example-attachmentpoint-id').
 */
async function getPolicy(policyId, attachmentPointId) {
  try {
    const name = `policies/${attachmentPointId}/denypolicies/${policyId}`;
    const [response] = await client.getPolicy({
      name,
    });
    console.log(`Retrieved policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Policy not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API Error [Code ${err.code}]: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {getPolicy};
// [END iam_v2_policies_policy_get]
