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

// [START storage_v2_storagecontrol_managedfolder_create]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Creates a managed folder in a Cloud Storage bucket.
 *
 * @param {string} managedFolderId - The identifier for the managed folder (for example, 'managed-folder/').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} bucketId - The Google Cloud Storage bucket ID.
 */
async function createManagedFolder(managedFolderId, projectId, bucketId) {
  try {
    const parent = `projects/${projectId}/buckets/${bucketId}`;
    const managedFolder = {};

    const [response] = await client.createManagedFolder({
      parent,
      managedFolder,
      managedFolderId,
    });

    console.log(`Created managed folder: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Managed folder already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target bucket not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createManagedFolder };
// [END storage_v2_storagecontrol_managedfolder_create]
