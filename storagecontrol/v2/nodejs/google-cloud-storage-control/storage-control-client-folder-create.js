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

// [START storage_v2_storagecontrol_create_folder]
// [START storage_storagecontrol_folder_create]
// [START storage_control_create_folder]
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Creates a new folder within a specified bucket.
 *
 * @param {string} bucketName The name of the bucket in which to create the folder.
 *   The bucket must have hierarchical namespace enabled. Example: 'my-bucket'
 * @param {string} folderId The full path of the folder to create, including all parent folders,
 *   ending with a slash. Example: 'my-folder/sub-folder/'
 */
async function createFolder(bucketName, folderId) {
  const parent = client.bucketPath('_', bucketName);

  const request = {
    parent,
    folder: {},
    folderId,
    recursive: true,
  };

  try {
    const [response] = await client.createFolder(request);
    console.log(`Folder ${response.name} created successfully.`);
    console.log(`Metageneration: ${response.metageneration}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Folder ${folderId} already exists in bucket ${bucketName}.`);
    } else {
      console.error('Error creating folder:', err);
    }
  }
}
// [END storage_control_create_folder]
// [END storage_storagecontrol_folder_create]
// [END storage_v2_storagecontrol_create_folder]

module.exports = {
  createFolder,
};
