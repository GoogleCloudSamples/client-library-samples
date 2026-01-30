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

// [START storage_v2_storagecontrol_managedfolder_delete]
// [START storage_storagecontrol_managedfolder_delete]
// [START storage_control_managed_folder_delete]
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Deletes a managed folder.
 *
 * @param {string} bucketName The name of the bucket containing the managed folder. (e.g., 'your-bucket-name')
 * @param {string} managedFolderName The name of the managed folder to delete. Must end with a slash (e.g., 'my-managed-folder/').
 */
async function deleteManagedFolder(bucketName, managedFolderName) {
  const managedFolderPath = client.managedFolderPath(
    '_',
    bucketName,
    managedFolderName,
  );

  const request = {
    name: managedFolderPath,
    allowNonEmpty: true,
  };

  try {
    await client.deleteManagedFolder(request);
    console.log(
      `Managed folder ${managedFolderName} in bucket ${bucketName} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Managed folder ${managedFolderName} not found in bucket ${bucketName}. ` +
          'Please ensure the managed folder name is correct and exists.',
      );
    } else {
      console.error(`Error deleting managed folder ${managedFolderName}:`, err);
    }
  }
}
// [END storage_control_managed_folder_delete]
// [END storage_storagecontrol_managedfolder_delete]
// [END storage_v2_storagecontrol_managedfolder_delete]

module.exports = {
  deleteManagedFolder,
};
