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

// [START dataform_v1beta1_dataform_foldertree_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the deleteFolderTree method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} folderId - The server-generated ID of the Folder. Read this from an existing Folder resource (for example, from a CreateFolder, QueryFolderContents, or QueryUserRootContents response).
 */
async function deleteFolderTree(projectId, locationId, folderId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    // Initiates the long-running operation to delete the folder tree
    const [operation] = await client.deleteFolderTree({name});

    // Waits for the long-running operation to complete
    await operation.promise();

    console.log(`Deleted folder tree: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested folder tree was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to delete the folder tree.');
    } else {
      console.error(`Failed to delete folder tree: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteFolderTree };
// [END dataform_v1beta1_dataform_foldertree_delete]
