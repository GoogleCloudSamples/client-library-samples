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

// [START storage_v2_storagecontrol_folderrecursive_delete]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the deleteFolderRecursive method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id'). Caller-chosen.
 * @param {string} bucketId - The caller-chosen name of the Cloud Storage bucket (for example, 'example-bucket-id'). The bucket must have hierarchical namespace enabled.
 * @param {string} folderId - The caller-chosen name or path of the folder to recursively delete (for example, 'example-folder/'). In hierarchical namespace buckets, folder IDs end with a slash.
 */
async function deleteFolderRecursive(projectId, bucketId, folderId) {
  try {
    const name = `projects/${projectId}/buckets/${bucketId}/folders/${folderId}`;

    const [operation] = await client.deleteFolderRecursive({name});
    await operation.promise();

    console.log(`Deleted folder recursively: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteFolderRecursive };
// [END storage_v2_storagecontrol_folderrecursive_delete]
