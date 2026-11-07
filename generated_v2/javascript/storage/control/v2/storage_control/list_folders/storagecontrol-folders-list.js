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

// [START storage_v2_storagecontrol_folders_list]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists folders in a Cloud Storage bucket with hierarchical namespace enabled.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} bucketId - The Cloud Storage bucket ID with hierarchical namespace enabled.
 */
async function listFolders(projectId, bucketId) {
  try {
    // Cloud Storage Control API requires '_' for global-namespaced buckets.
    const parent = `projects/_/buckets/${bucketId}`;

    const request = {
      parent,
    };

    const [folders] = await client.listFolders(request);

    for (const folder of folders) {
      console.log(`Folder: ${folder.name}`);
    }
    console.log(`Total folders: ${folders.length}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Bucket not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Hierarchical namespace is not enabled: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listFolders};
// [END storage_v2_storagecontrol_folders_list]
