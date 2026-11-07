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

// [START storage_v2_storagecontrol_folder_delete]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Deletes a folder in a Cloud Storage bucket.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} bucketId - ID of the Bucket (for example, 'example-bucket-id')
 * @param {string} folderId - ID of the Folder (for example, 'example-folder-id')
 */
async function deleteFolder(projectId, bucketId, folderId) {
  try {
    // Cloud Storage uses '_' as the project identifier in folder resource paths.
    const name = client.folderPath('_', bucketId, folderId);
    const request = {
      name,
    };

    await client.deleteFolder(request);
    console.log(`Deleted folder: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${client.folderPath('_', bucketId, folderId)}`);
    } else {
      console.error(`Failed to delete folder: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteFolder };
// [END storage_v2_storagecontrol_folder_delete]
