// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START storage_v2_storagecontrol_folder_delete]
// [START storage_storagecontrol_folder_delete]
// [START storage_control_delete_folder]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');
const gax = require('google-gax');

const client = new StorageControlClient();

/**
 * Permanently deletes an empty folder in a hierarchical namespace enabled bucket.
 * This operation is only applicable to a hierarchical namespace enabled bucket.
 *
 * @param {string} bucketName The name of the bucket.
 * @param {string} folderPath The full path of the folder to delete, ending with a slash. Example: 'your-folder/to/delete/'
 */
async function deleteFolder(bucketName, folderPath) {
  // Example: projects/_/buckets/${bucketName}/folders/${folderPath};
  const name = client.folderPath('_', bucketName, folderPath);

  const request = {
    name,
    requestId: gax.makeUUID(),
  };

  try {
    await client.deleteFolder(request);
    console.log(
      `Folder ${folderPath} deleted successfully from bucket ${bucketName}.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Folder ${folderPath} not found in bucket ${bucketName}. It might have already been deleted.`,
      );
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        `Folder ${folderPath} is not empty or conditional deletion failed. Please ensure the folder is empty before deleting.`,
      );
    } else {
      console.error(`Error deleting folder ${folderPath}:`, err);
    }
  }
}
// [END storage_control_delete_folder]
// [END storage_storagecontrol_folder_delete]
// [END storage_v2_storagecontrol_folder_delete]

module.exports = {deleteFolder};
