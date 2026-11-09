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

// [START cloudresourcemanager_v3_projects_iampolicy_get]
'use strict';

const {ProjectsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new ProjectsClient();

/**
 * Retrieves the IAM access control policy for a specified Google Cloud Project.
 *
 * @param {string} projectId - The unique, user-assigned ID or project number of the Google Cloud Project.
 */
async function getIamPolicy(projectId) {
  try {
    const resource = `projects/${projectId}`;
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    console.log(`Bindings: ${JSON.stringify(policy.bindings, null, 2)}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing IAM policy for project: ${projectId}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END cloudresourcemanager_v3_projects_iampolicy_get]
