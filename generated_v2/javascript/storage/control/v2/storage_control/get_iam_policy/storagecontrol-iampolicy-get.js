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

// [START storage_v2_storagecontrol_iampolicy_get]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} bucketId - The ID of the Cloud Storage bucket.
 */
async function getIamPolicy(bucketId) {
  try {
    // Cloud Storage IAM uses literal '_' for the project segment
    const resource = `projects/_/buckets/${bucketId}`;

    const [policy] = await client.getIamPolicy({
      resource,
    });

    console.log(`Retrieved IAM policy for ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    console.log(`Policy bindings: ${JSON.stringify(policy.bindings, null, 2)}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource ${bucketId} does not exist.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied for resource ${bucketId}.`);
    } else {
      console.error(`API error retrieving IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END storage_v2_storagecontrol_iampolicy_get]
