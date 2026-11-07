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

// [START accesscontextmanager_v1_accesscontextmanager_set_iam_policy]
'use strict';

const {AccessContextManagerClient} = require('@google-cloud/access-context-manager');
const {status} = require('@grpc/grpc-js');

/**
 * Sets the IAM policy for the specified Access Context Manager resource.
 */
async function setIamPolicy() {
  const client = new AccessContextManagerClient();

  const resource = 'accessPolicies/example-access-policy-id';
  const policy = {
    bindings: [
      {
        role: 'roles/accesscontextmanager.policyAdmin',
        members: ['user:example-admin@example.com'],
      },
    ],
  };

  try {
    const [response] = await client.setIamPolicy({
      resource,
      policy,
    });

    console.log(`IAM policy updated for resource: ${resource}`);
    console.log('Bindings:', response.bindings);
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.log('Request completed: Insufficient access to update the policy.');
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Request completed: Resource does not exist: ${resource}`);
    } else {
      throw err;
    }
  }
}

module.exports = {setIamPolicy};
// [END accesscontextmanager_v1_accesscontextmanager_set_iam_policy]
