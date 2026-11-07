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

// [START dataform_v1_dataform_teamfolder_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Retrieves a Dataform team folder.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) ID, such as us-central1.
 * @param {string} teamFolderId - The server-generated ID of the TeamFolder to fetch.
 */
async function getTeamFolder(projectId, locationId, teamFolderId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/teamFolders/${teamFolderId}`;

    const request = {
      name,
    };

    const [teamFolder] = await client.getTeamFolder(request);

    console.log(`Team folder retrieved: ${teamFolder.name}`);
    return teamFolder;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Team folder not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing team folder: ${err.message}`);
    } else {
      console.error(`Error retrieving team folder: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTeamFolder };
// [END dataform_v1_dataform_teamfolder_get]
