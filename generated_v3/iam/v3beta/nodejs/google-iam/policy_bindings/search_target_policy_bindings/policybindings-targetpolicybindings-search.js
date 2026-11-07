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

// [START iam_v3beta_policybindings_targetpolicybindings_search]
'use strict';

const iam = require('@google-cloud/iam');
const {status} = require('@grpc/grpc-js');

const PolicyBindingsClient =
  (iam.v3beta && iam.v3beta.PolicyBindingsClient) ||
  (iam.v3 && iam.v3.PolicyBindingsClient) ||
  iam.PolicyBindingsClient;

const client = new PolicyBindingsClient();

/**
 * Searches policy bindings bound to a target resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 * @param {string} target - The target resource bound to the policy, specified as a full resource name (for example, '//cloudresourcemanager.googleapis.com/projects/123456789012' or '//cloudresourcemanager.googleapis.com/organizations/123456789012').
 */
async function searchTargetPolicyBindings(projectId, locationId, target) {
  let actualLocationId = locationId;
  let actualTarget = target;

  // Handle parameter ordering variations between target and locationId
  if (typeof locationId === 'string' && locationId.startsWith('//')) {
    actualLocationId = target || 'global';
    actualTarget = locationId;
  }

  const parent = `projects/${projectId}/locations/${actualLocationId}`;
  const request = {
    parent,
    target: actualTarget,
  };

  try {
    const [policyBindings] = await client.searchTargetPolicyBindings(request);
    if (!policyBindings || policyBindings.length === 0) {
      console.log(`No policy bindings found for target: ${actualTarget}`);
    } else {
      for (const binding of policyBindings) {
        console.log(`Found policy binding: ${binding.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to search target policy bindings: ${err.message || err}`);
    }
  }
}

module.exports = { searchTargetPolicyBindings };
// [END iam_v3beta_policybindings_targetpolicybindings_search]
