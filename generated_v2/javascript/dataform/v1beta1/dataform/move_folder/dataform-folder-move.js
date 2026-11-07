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

// [START dataform_v1beta1_dataform_move_folder]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the moveFolder method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region/location ID (e.g., 'us-central1').
 * @param {string} folderId - The server-generated ID of the Dataform folder to move.
 * @param {string} destinationContainingFolder - The resource name of the destination Folder, TeamFolder, or empty string to move into the root folder.
 */
async function moveFolder(projectId, locationId, folderId, destinationContainingFolder) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    const request = {
      name,
      destinationContainingFolder,
    };

    // Initiate the long-running operation to move the folder
    const [operation] = await client.moveFolder(request);

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Moved folder: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder or destination not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Folder already exists in the destination: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { moveFolder };
// [END dataform_v1beta1_dataform_move_folder]
