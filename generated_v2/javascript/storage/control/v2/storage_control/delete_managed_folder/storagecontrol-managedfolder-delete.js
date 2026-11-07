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

// [START storage_v2_storagecontrol_managedfolder_delete]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the deleteManagedFolder method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} bucketId - ID of the Cloud Storage bucket (for example, 'example-bucket-id').
 * @param {string} managedFolderId - ID or path of the managed folder to delete (for example, 'example-folder/').
 */
async function deleteManagedFolder(projectId, bucketId, managedFolderId) {
  try {
    const name = `projects/${projectId}/buckets/${bucketId}/managedFolders/${managedFolderId}`;

    await client.deleteManagedFolder({name});
    console.log(`Deleted managed folder: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Managed folder not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteManagedFolder };
// [END storage_v2_storagecontrol_managedfolder_delete]
