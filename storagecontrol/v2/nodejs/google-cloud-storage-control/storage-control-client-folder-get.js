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

// [START storage_v2_storagecontrol_folder_get]
// [START storage_storagecontrol_folder_get]
// [START storage_control_get_folder]
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const storageControlClient = new StorageControlClient();

/**
 * Retrieves metadata for a specified folder within a hierarchical namespace enabled bucket.
 *
 * @param {string} bucketName The name of the bucket containing the folder.
 * @param {string} folderName The full path of the folder to retrieve (e.g., 'my-folder/sub-folder/').
 */
async function getFolder(bucketName, folderName) {
  // Example: projects/_/buckets/${bucketName}/folders/${folderName};
  const name = storageControlClient.folderPath('_', bucketName, folderName);

  const request = {
    name: name,
  };

  try {
    const [folder] = await storageControlClient.getFolder(request);
    console.log(`Successfully retrieved folder: ${folder.name}`);
    console.log(`\tMetageneration: ${folder.metageneration}`);
    if (folder.createTime) {
      const createTime = new Date(
        folder.createTime.seconds * 1000 + folder.createTime.nanos / 1000000,
      );
      console.log(`\tCreate Time: ${createTime}`);
    }

    if (folder.pendingRenameInfo) {
      console.log(
        `  Pending Rename Operation: ${folder.pendingRenameInfo.operation}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder ${folderName} not found in bucket ${bucketName}.`);
      console.error(
        'Please ensure the folder exists and the bucket has hierarchical namespaces enabled.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied to get folder ${folderName}. Please check your IAM permissions.`,
      );
    } else {
      console.error(`Error getting folder ${folderName}:`, err.message);
    }
  }
}
// [END storage_control_get_folder]
// [END storage_storagecontrol_folder_get]
// [END storage_v2_storagecontrol_folder_get]

module.exports = {
  getFolder,
};
