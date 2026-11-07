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

// [START bigtable_v2_bigtableinstanceadmin_set_iam_policy]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

const client = new v2.BigtableInstanceAdminClient();

/**
 * Sets the IAM policy for a Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID containing the Bigtable instance.
 * @param {string} instanceId - The caller-chosen ID of the Bigtable instance whose IAM policy is being set.
 */
async function setIamPolicy(projectId, instanceId) {
  const resource = `projects/${projectId}/instances/${instanceId}`;

  try {
    const [currentPolicy] = await client.getIamPolicy({resource});

    const policy = {
      etag: currentPolicy.etag,
      bindings: [
        ...(currentPolicy.bindings || []),
        {
          role: 'roles/bigtable.user',
          members: [
            `serviceAccount:example-service-account@${projectId}.iam.gserviceaccount.com`,
          ],
        },
      ],
    };

    const updateMask = {
      paths: ['bindings'],
    };

    const [updatedPolicy] = await client.setIamPolicy({
      resource,
      policy,
      updateMask,
    });

    console.log(`Set IAM policy for resource: ${resource}`);
    console.log(`Updated policy etag: ${Buffer.from(updatedPolicy.etag || '').toString('base64')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${resource}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating IAM policy for ${resource}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Etag concurrency conflict on ${resource}: ${err.message}`);
    } else {
      console.error(`Error setting IAM policy: ${err.message}`);
    }
  }
}

module.exports = { setIamPolicy };
// [END bigtable_v2_bigtableinstanceadmin_set_iam_policy]
