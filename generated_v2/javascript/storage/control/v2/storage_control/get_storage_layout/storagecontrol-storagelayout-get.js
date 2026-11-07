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

// [START storage_v2_storagecontrol_storagelayout_get]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the getStorageLayout method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} bucketId - ID of the Bucket (for example, 'example-bucket-id')
 */
async function getStorageLayout(projectId, bucketId) {
  try {
    // Construct the resource name for the storage layout
    const name = client.storageLayoutPath(projectId, bucketId);

    const request = {
      name,
    };

    const [response] = await client.getStorageLayout(request);

    console.log(`Storage layout name: ${response.name}`);
    console.log(`Location: ${response.location}`);
    console.log(`Location type: ${response.locationType}`);
    if (response.hierarchicalNamespace) {
      console.log(`Hierarchical namespace enabled: ${response.hierarchicalNamespace.enabled}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Storage layout not found for bucket ${bucketId}: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err}`);
    }
  }
}

module.exports = { getStorageLayout };
// [END storage_v2_storagecontrol_storagelayout_get]
