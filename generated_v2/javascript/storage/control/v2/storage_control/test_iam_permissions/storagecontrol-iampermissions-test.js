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

// [START storage_v2_storagecontrol_test_iam_permissions]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Tests IAM permissions on a Cloud Storage bucket.
 *
 * @param {string} bucketId - The ID of the Cloud Storage bucket to test permissions against (for example, 'example-bucket').
 */
async function testIamPermissions(bucketId) {
  try {
    const resource = `projects/_/buckets/${bucketId}`;
    const permissions = ['storage.buckets.get'];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    const granted = response.permissions && response.permissions.length > 0
      ? response.permissions.join(', ')
      : 'none';
    console.log(`Permissions granted: ${granted}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Bucket not found: ${bucketId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied on bucket: ${bucketId}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END storage_v2_storagecontrol_test_iam_permissions]
