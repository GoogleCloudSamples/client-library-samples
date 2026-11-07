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

// [START storage_v2_storagecontrol_managedfolder_get]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves metadata for a managed folder in Cloud Storage.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} bucketId - ID of the Bucket (for example, 'example-bucket-id')
 * @param {string} managedFolderId - ID of the ManagedFolder (for example, 'example-managedfolder-id')
 */
async function getManagedFolder(projectId, bucketId, managedFolderId) {
  try {
    // The Storage Control API requires '_' as the project ID for bucket-scoped resources.
    const name = client.managedFolderPath('_', bucketId, managedFolderId);

    const [managedFolder] = await client.getManagedFolder({
      name,
    });

    console.log(`Retrieved managed folder: ${managedFolder.name}`);
    console.log(`Metageneration: ${managedFolder.metageneration}`);
    return managedFolder;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Managed folder not found: ${projectId}/${bucketId}/${managedFolderId}`
      );
    } else {
      console.error(`Failed to retrieve managed folder: ${err.message}`);
    }
  }
}

module.exports = {getManagedFolder};
// [END storage_v2_storagecontrol_managedfolder_get]
