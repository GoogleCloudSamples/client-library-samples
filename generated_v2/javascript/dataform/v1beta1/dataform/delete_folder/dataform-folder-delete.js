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

// [START dataform_v1beta1_dataform_folder_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the deleteFolder method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the folder resides.
 * @param {string} folderId - The server-generated ID of the Dataform folder.
 */
async function deleteFolder(projectId, locationId, folderId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    const request = {
      name,
    };

    // Delete the empty Dataform folder.
    await client.deleteFolder(request);
    console.log(`Deleted folder: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${folderId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Folder cannot be deleted because it is not empty: ${err.message}`);
    } else {
      console.error(`Failed to delete folder: ${err.message}`);
    }
  }
}

module.exports = { deleteFolder };
// [END dataform_v1beta1_dataform_folder_delete]
