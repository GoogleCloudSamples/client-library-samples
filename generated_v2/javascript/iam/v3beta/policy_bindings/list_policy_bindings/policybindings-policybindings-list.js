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

// [START iam_v3beta_policybindings_policybindings_list]
'use strict';

const {PolicyBindingsClient} = require('@google-cloud/iam').v3beta;
const {status} = require('@grpc/grpc-js');

const client = new PolicyBindingsClient();

/**
 * Lists policy bindings in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 */
async function listPolicyBindings(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [policyBindings] = await client.listPolicyBindings(request);

    if (policyBindings.length === 0) {
      console.log('No policy bindings found.');
      return;
    }

    for (const binding of policyBindings) {
      console.log(`Policy binding: ${binding.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API execution failed: ${err.message}`);
    }
  }
}

module.exports = { listPolicyBindings };
// [END iam_v3beta_policybindings_policybindings_list]
