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

// [START dataform_v1beta1_dataform_folder_update]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Updates an existing Dataform folder.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location/region of the Dataform folder (for example, "us-central1").
 * @param {string} folderId - The server-generated ID of the Dataform folder.
 */
async function updateFolder(projectId, locationId, folderId) {
  try {
    const folder = {
      name: `projects/${projectId}/locations/${locationId}/folders/${folderId}`,
      displayName: `Updated Folder Name ${Date.now()}`,
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      folder,
      updateMask,
    };

    const [response] = await client.updateFolder(request);
    console.log(`Updated folder: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API Error: ${err.message} (code: ${err.code})`);
      return;
    }
    throw err;
  }
}

module.exports = {updateFolder};
// [END dataform_v1beta1_dataform_folder_update]
