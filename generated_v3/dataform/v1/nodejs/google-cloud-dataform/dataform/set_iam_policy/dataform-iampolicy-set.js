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

// [START dataform_v1_dataform_set_iam_policy]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Sets the IAM policy for a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} repositoryId - The Dataform repository ID.
 */
async function setIamPolicy(projectId, locationId, repositoryId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    // Retrieve the existing IAM policy to preserve the etag.
    const [existingPolicy] = await client.getIamPolicy({resource});

    // Resolve an existing service account identity from Application Default Credentials.
    let serviceAccountEmail;
    try {
      const credentials = await client.auth.getCredentials();
      serviceAccountEmail = credentials.client_email;
      if (!serviceAccountEmail) {
        const authClient = await client.auth.getClient();
        serviceAccountEmail = authClient.email;
      }
    } catch {
      // Fall back if credentials cannot be resolved directly
    }

    let member;
    if (serviceAccountEmail) {
      member = `serviceAccount:${serviceAccountEmail}`;
    } else if (existingPolicy.bindings && existingPolicy.bindings.length > 0) {
      member = existingPolicy.bindings[0].members?.[0];
    } else {
      member = 'serviceAccount:example-service-account@example-project-id.iam.gserviceaccount.com';
    }

    const policy = {
      etag: existingPolicy.etag,
      bindings: [
        {
          role: 'roles/viewer',
          members: [member],
        },
      ],
    };
    const updateMask = {
      paths: ['bindings'],
    };

    const request = {
      resource,
      policy,
      updateMask,
    };

    const [updatedPolicy] = await client.setIamPolicy(request);

    console.log(`Successfully updated IAM policy for ${resource}`);
    console.log(`ETag: ${updatedPolicy.etag}`);
    console.log(`Bindings: ${JSON.stringify(updatedPolicy.bindings, null, 2)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
  }
}

module.exports = {setIamPolicy};
// [END dataform_v1_dataform_set_iam_policy]
