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

// [START dataform_v1_dataform_move_folder]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the moveFolder method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) ID, such as 'us-central1'.
 * @param {string} folderId - The server-generated ID of the Dataform folder to move.
 * @param {string} destinationContainingFolder - The full resource name of the destination Folder or TeamFolder, or an empty string to move into the root User folder.
 */
async function moveFolder(projectId, locationId, folderId, destinationContainingFolder) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    const request = {
      name,
      destinationContainingFolder,
    };

    // MoveFolder initiates a long-running operation
    const [operation] = await client.moveFolder(request);
    const [response] = await operation.promise();

    console.log(`Folder moved successfully: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Destination already contains folder: ${err.message}`);
    } else {
      console.error(`Failed to move folder: ${err.message}`);
    }
  }
}

module.exports = { moveFolder };
// [END dataform_v1_dataform_move_folder]
