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

// [START orgpolicy_v2_orgpolicy_effectivepolicy_get]
'use strict';

const {OrgPolicyClient} = require('@google-cloud/org-policy');
const {status} = require('@grpc/grpc-js');

const client = new OrgPolicyClient();

/**
 * Retrieves the effective organization policy evaluated on a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} policyId - The constraint name configured by the policy (for example, 'compute.disableSerialPortAccess').
 */
async function getEffectivePolicy(projectId, policyId) {
  try {
    const name = `projects/${projectId}/policies/${policyId}`;

    const [policy] = await client.getEffectivePolicy({
      name,
    });

    console.log(`Retrieved effective policy: ${policy.name}`);
    if (policy.spec && policy.spec.rules) {
      console.log(`Evaluated rules count: ${policy.spec.rules.length}`);
    }

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Effective policy resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing policy: ${err.message}`);
    } else {
      console.error(`Error retrieving effective policy: ${err.message}`);
    }
  }
}

module.exports = { getEffectivePolicy };
// [END orgpolicy_v2_orgpolicy_effectivepolicy_get]
