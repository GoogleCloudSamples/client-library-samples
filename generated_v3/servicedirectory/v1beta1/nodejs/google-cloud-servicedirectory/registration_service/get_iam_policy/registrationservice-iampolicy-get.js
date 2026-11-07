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

// [START servicedirectory_v1beta1_registrationservice_iampolicy_get]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Gets the IAM policy for a Service Directory namespace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the namespace is located.
 * @param {string} namespaceId - The ID of the Service Directory namespace.
 */
async function getIamPolicy(projectId, locationId, namespaceId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}`;

    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy bindings: ${JSON.stringify(policy.bindings, null, 2)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error retrieving IAM policy: ${err.message}`);
    }
  }
}

module.exports = { getIamPolicy };
// [END servicedirectory_v1beta1_registrationservice_iampolicy_get]
