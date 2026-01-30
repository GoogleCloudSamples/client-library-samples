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

// [START storage_v2_storagecontrol_managedfolder_create]
// [START storage_storagecontrol_managedfolder_create]
// [START storage_control_managed_folder_create]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Creates a new managed folder within a specified bucket.
 *
 * @param {string} bucketName The name of the bucket where the managed folder will be created (e.g., 'my-bucket')
 * @param {string} managedFolderId The ID of the managed folder to create (e.g., 'my-managed-folder/')
 */
async function createManagedFolder(bucketName, managedFolderId) {
  const parent = `projects/_/buckets/${bucketName}`;

  const request = {
    parent,
    managedFolder: {},
    managedFolderId,
  };

  try {
    const [response] = await client.createManagedFolder(request);
    console.log(
      `Managed folder ${response.name} created successfully with metageneration ${response.metageneration}.`,
    );
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Managed folder ${managedFolderId} already exists in bucket ${bucketName}.`,
      );
    } else {
      console.error(`Error creating managed folder:`, err);
      console.error(
        'Please check your bucket name, and ensure you have the necessary permissions.',
      );
    }
  }
}
// [END storage_control_managed_folder_create]
// [END storage_storagecontrol_managedfolder_create]
// [END storage_v2_storagecontrol_managedfolder_create]

module.exports = {
  createManagedFolder,
};
