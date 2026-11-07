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

// [START storage_v2_storagecontrol_set_iam_policy]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Updates the IAM policy for a Cloud Storage bucket.
 *
 * @param {string} projectId - The Google Cloud project ID or wildcard '_'.
 * @param {string} bucketId - The ID of the Cloud Storage bucket.
 */
async function setIamPolicy(projectId, bucketId) {
  try {
    // Cloud Storage Control requires the wildcard '_' project identifier for bucket resources.
    const resource = `projects/_/buckets/${bucketId}`;

    // Retrieve the current policy to preserve its etag for concurrency control.
    const [currentPolicy] = await client.getIamPolicy({resource});

    // Reuse an existing member from the current policy to supply a valid identity.
    const existingMember =
      currentPolicy.bindings?.find(b => b.members && b.members.length > 0)
        ?.members?.[0] ||
      (projectId && projectId !== '_'
        ? `projectViewer:${projectId}`
        : 'allAuthenticatedUsers');

    const policy = {
      etag: currentPolicy.etag,
      bindings: [
        ...(currentPolicy.bindings || []),
        {
          role: 'roles/storage.objectViewer',
          members: [existingMember],
        },
      ],
    };

    const updateMask = {
      paths: ['bindings', 'etag'],
    };

    const [updatedPolicy] = await client.setIamPolicy({
      resource,
      policy,
      updateMask,
    });

    console.log(`Updated IAM policy for ${resource}:`);
    console.log(JSON.stringify(updatedPolicy, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Bucket ${bucketId} does not exist.`);
    } else if (err.code === status.ABORTED) {
      console.error('Concurrency conflict detected while updating IAM policy.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when updating IAM policy on bucket ${bucketId}.`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
  }
}

module.exports = { setIamPolicy };
// [END storage_v2_storagecontrol_set_iam_policy]
