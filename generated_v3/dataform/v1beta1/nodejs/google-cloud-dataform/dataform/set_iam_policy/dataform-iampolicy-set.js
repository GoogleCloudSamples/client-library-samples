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

// [START dataform_v1beta1_dataform_set_iam_policy]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Sets the IAM policy for a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Dataform repository location (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository.
 */
async function setIamPolicy(projectId, locationId, repositoryId) {
  try {
    const resource = client.repositoryPath(projectId, locationId, repositoryId);

    // Retrieve existing policy to maintain concurrency control
    const [existingPolicy] = await client.getIamPolicy({resource});

    // Identify an existing principal from the authenticated client or current policy
    const credentials = await client.auth.getCredentials();
    const authClient = await client.auth.getClient();
    const callerEmail = authClient.email || credentials?.client_email;

    let member;
    if (callerEmail) {
      const prefix = callerEmail.endsWith('.gserviceaccount.com')
        ? 'serviceAccount:'
        : 'user:';
      member = `${prefix}${callerEmail}`;
    } else if (existingPolicy.bindings?.[0]?.members?.[0]) {
      member = existingPolicy.bindings[0].members[0];
    } else {
      member = 'serviceAccount:example-service-account@example-project-id.iam.gserviceaccount.com';
    }

    const policy = {
      etag: existingPolicy.etag,
      bindings: [
        {
          role: 'roles/dataform.viewer',
          members: [member],
        },
      ],
    };
    const updateMask = {
      paths: ['bindings'],
    };

    const [response] = await client.setIamPolicy({
      resource,
      policy,
      updateMask,
    });

    console.log(`Updated IAM policy for resource: ${resource}`);
    console.log(`Role bindings: ${JSON.stringify(response.bindings, null, 2)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when updating IAM policy: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied for IAM policy: ${err.message}`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { setIamPolicy };
// [END dataform_v1beta1_dataform_set_iam_policy]
