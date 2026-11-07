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

// [START dataform_v1_dataform_move_repository]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Moves a Dataform repository to a specified folder or to the root folder.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Dataform repository to move.
 * @param {string} destinationContainingFolder - The resource name of the Folder, TeamFolder, or an empty string to move into the root folder.
 */
async function moveRepository(projectId, locationId, repositoryId, destinationContainingFolder) {
  try {
    const name = client.repositoryPath(projectId, locationId, repositoryId);

    const request = {
      name,
      destinationContainingFolder,
    };

    // MoveRepository is a long-running operation.
    const [operation] = await client.moveRepository(request);
    const [response] = await operation.promise();

    console.log(`Repository moved: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository or destination folder not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Destination already contains repository: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { moveRepository };
// [END dataform_v1_dataform_move_repository]
