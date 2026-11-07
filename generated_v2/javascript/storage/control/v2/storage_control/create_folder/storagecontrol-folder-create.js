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

// [START storage_v2_storagecontrol_folder_create]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Creates a folder in a hierarchical namespace enabled Cloud Storage bucket.
 *
 * @param {string} folderId - The full path and name of the folder, including any parent folders. Must end with a trailing slash (for example, 'example-folder/').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} bucketId - The name of the hierarchical namespace enabled Cloud Storage bucket.
 */
async function createFolder(folderId, projectId, bucketId) {
  try {
    // Construct the parent resource path. Cloud Storage uses '_' for global-namespaced buckets.
    const parent = `projects/_/buckets/${bucketId}`;
    // Initialize an empty folder object without name or bucket fields.
    const folder = {};

    const [response] = await client.createFolder({
      parent,
      folder,
      folderId,
    });

    console.log(`Created folder: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Folder already exists: ${folderId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Bucket not found: ${bucketId}`);
    } else {
      console.error(`Failed to create folder: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createFolder };
// [END storage_v2_storagecontrol_folder_create]
