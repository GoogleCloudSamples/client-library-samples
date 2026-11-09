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

// [START dataform_v1beta1_dataform_folder_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Retrieves a Dataform folder.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, us-central1).
 * @param {string} folderId - The server-generated ID of the Dataform folder.
 */
async function getFolder(projectId, locationId, folderId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    const [folder] = await client.getFolder({name});
    console.log(`Folder retrieved: ${folder.name}`);
    return folder;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing folder: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getFolder };
// [END dataform_v1beta1_dataform_folder_get]
