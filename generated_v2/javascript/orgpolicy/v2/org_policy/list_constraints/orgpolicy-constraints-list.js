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

// [START orgpolicy_v2_orgpolicy_constraints_list]
'use strict';

const {OrgPolicyClient} = require('@google-cloud/org-policy');
const {status} = require('@grpc/grpc-js');

const client = new OrgPolicyClient();

/**
 * Lists constraints for a Google Cloud project.
 *
 * @param {string} [project_id=example-project-id] - The Google Cloud project ID.
 */
async function listConstraints(project_id = 'example-project-id') {
  try {
    const parent = `projects/${project_id}`;
    const request = {
      parent,
    };

    const [constraints] = await client.listConstraints(request);

    for (const constraint of constraints) {
      console.log(`Constraint: ${constraint.name}`);
      console.log(`Display Name: ${constraint.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message || err}`);
    }
  }
}

module.exports = { listConstraints };
// [END orgpolicy_v2_orgpolicy_constraints_list]
