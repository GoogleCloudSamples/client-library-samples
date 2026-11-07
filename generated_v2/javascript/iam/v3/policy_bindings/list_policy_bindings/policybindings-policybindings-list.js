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

// [START iam_v3_policybindings_policybindings_list]
'use strict';

const {PolicyBindingsClient} = require('@google-cloud/iam').v3;
const {status} = require('@grpc/grpc-js');

const client = new PolicyBindingsClient();

/**
 * Lists IAM policy bindings in a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 */
async function listPolicyBindings(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [policyBindings] = await client.listPolicyBindings({
      parent,
    });

    console.log(`Listed ${policyBindings.length} policy binding(s) in ${parent}.`);
    for (const binding of policyBindings) {
      console.log(`Policy binding: ${binding.name}`);
      console.log(`Target: ${binding.target ? binding.target.principalSet : ''}`);
      console.log(`Policy: ${binding.policy}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied listing policy bindings: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listPolicyBindings };
// [END iam_v3_policybindings_policybindings_list]
