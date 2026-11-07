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

// [START clouddeploy_v1_clouddeploy_deploypolicies_list]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Cloud Deploy policies in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function listDeployPolicies(projectId) {
  const client = new CloudDeployClient();

  try {
    const locationName = 'us-central1';
    const parent = `projects/${projectId}/locations/${locationName}`;

    const [deployPolicies] = await client.listDeployPolicies({parent});

    console.log(`Listed deploy policies for ${parent}:`);
    for (const policy of deployPolicies) {
      console.log(`- Policy: ${policy.name}`);
      if (policy.description) {
        console.log(`  Description: ${policy.description}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listDeployPolicies };
// [END clouddeploy_v1_clouddeploy_deploypolicies_list]
