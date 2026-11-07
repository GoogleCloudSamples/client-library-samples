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

// [START iam_v3_policybindings_targetpolicybindings_search]
'use strict';

const {PolicyBindingsClient} = require('@google-cloud/iam').v3;
const {status} = require('@grpc/grpc-js');

const client = new PolicyBindingsClient();

/**
 * Searches policy bindings for a target resource.
 *
 * @param {string} projectId - The Google Cloud project ID where the search is performed (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global').
 * @param {string} projectNumber - The Google Cloud project number of the target resource (for example, '123456789012').
 */
async function searchTargetPolicyBindings(projectId, locationId, projectNumber) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const target = `//cloudresourcemanager.googleapis.com/projects/${projectNumber}`;

    const request = {
      parent,
      target,
    };

    const [policyBindings] = await client.searchTargetPolicyBindings(request);
    console.log(`Found ${policyBindings.length} policy binding(s).`);
    for (const binding of policyBindings) {
      console.log(`Policy binding: ${binding.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { searchTargetPolicyBindings };
// [END iam_v3_policybindings_targetpolicybindings_search]
