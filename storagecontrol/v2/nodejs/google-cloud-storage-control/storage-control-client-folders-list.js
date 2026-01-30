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

// [START storage_v2_storagecontrol_folders_list]
// [START storage_storagecontrol_folders_list]
// [START storage_control_list_folders]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists folders in a hierarchical namespace enabled bucket.
 *
 * @param {string} bucketName The name of the bucket to list folders from. (e.g. 'my-bucket')
 */
async function listFolders(bucketName) {
  const parent = `projects/_/buckets/${bucketName}`;

  const request = {
    parent: parent,
    prefix: 'my-sample-folder/',
    delimiter: '/',
  };

  try {
    const [folders] = await client.listFolders(request);

    if (folders.length === 0) {
      console.log(
        `No folders found with prefix "${request.prefix}" in bucket: ${bucketName}`,
      );
      return;
    }

    for (const folder of folders) {
      console.log(`Folder name: ${folder.name}`);
      console.log(`\tMetageneration: ${folder.metageneration}`);
      if (folder.createTime) {
        const createTime = new Date(
          folder.createTime.seconds * 1000 + folder.createTime.nanos / 1000000,
        );
        console.log(`\tCreate Time: ${createTime}`);
      }
    }
    console.log(`Successfully listed folders in bucket: ${bucketName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Bucket '${bucketName}' not found or does not exist.`,
      );
      console.error(
        'Please ensure the bucket exists and you have the necessary permissions.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Error: Permission denied for bucket '${bucketName}'.`);
      console.error(
        'Please ensure your service account has the storage.folders.list permission for this bucket.',
      );
    } else if (
      err.details &&
      err.details.includes('Bucket is not hierarchical namespace enabled')
    ) {
      console.error(
        `Error: Bucket '${bucketName}' is not hierarchical namespace enabled.`,
      );
      console.error(
        'This operation only applies to buckets with hierarchical namespaces enabled.',
      );
    } else {
      console.error('Error listing folders:', err);
    }
  }
}
// [END storage_control_list_folders]
// [END storage_storagecontrol_folders_list]
// [END storage_v2_storagecontrol_folders_list]

module.exports = {
  listFolders,
};
