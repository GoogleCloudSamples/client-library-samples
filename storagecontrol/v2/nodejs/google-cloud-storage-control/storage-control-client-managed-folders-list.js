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

// [START storage_v2_storagecontrol_managedfolders_list]
// [START storage_storagecontrol_managedfolders_list]
// [START storage_control_managed_folder_list]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists all managed folders within a specified bucket.
 *
 * @param {string} bucketName The name of the bucket to list managed folders from.
 *   Example: 'your-bucket-name'
 */
async function listManagedFolders(bucketName) {
  const parent = client.bucketPath('_', bucketName);

  const request = {
    parent,
    // Optional: Filter results to match managed folders with names starting with this prefix.
    // If not needed, set to an empty string or omit.
    prefix: '',
  };

  try {
    console.log(
      `Attempting to list managed folders in bucket: "${bucketName}"...`,
    );

    const [managedFolders] = await client.listManagedFolders(request);

    if (managedFolders.length === 0) {
      console.log(`No managed folders found in bucket: "${bucketName}".`);
      return;
    }

    console.log('Found managed folders:');

    for (const managedFolder of managedFolders) {
      console.log(`- Name: ${managedFolder.name}`);
      if (managedFolder.createTime) {
        const createTime = new Date(
          managedFolder.createTime.seconds * 1000 +
            managedFolder.createTime.nanos / 1000000,
        );
        console.log(`  Create Time: ${createTime}`);
      }
      console.log(`  Metageneration: ${managedFolder.metageneration}`);
    }

    console.log(
      `Successfully listed ${managedFolders.length} managed folder(s) in bucket "${bucketName}".`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Bucket "${bucketName}" not found or does not exist. ` +
          'Please verify the bucket name is correct. ' +
          'Ensure the bucket is hierarchical namespace enabled.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing managed folders in bucket "${bucketName}". ` +
          'Please ensure the authenticated service account or user has the necessary ' +
          'permissions (e.g., "storage.managedFolders.list") for this bucket.',
      );
    } else {
      console.error(`Error listing managed folders: ${err.message}`);
    }
  }
}
// [END storage_control_managed_folder_list]
// [END storage_storagecontrol_managedfolders_list]
// [END storage_v2_storagecontrol_managedfolders_list]

module.exports = {
  listManagedFolders,
};
