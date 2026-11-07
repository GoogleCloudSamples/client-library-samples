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

// [START dataform_v1_dataform_teamfolder_update]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Updates a Dataform team folder display name.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'us-central1').
 * @param {string} teamFolderId - The server-generated ID of the Dataform team folder, sourced from an existing TeamFolder resource.
 */
async function updateTeamFolder(projectId, locationId, teamFolderId) {
  try {
    const teamFolder = {
      name: `projects/${projectId}/locations/${locationId}/teamFolders/${teamFolderId}`,
      displayName: `Updated Team Folder ${Date.now()}`,
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      teamFolder,
      updateMask,
    };

    const [response] = await client.updateTeamFolder(request);
    console.log(`Updated team folder: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Team folder not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTeamFolder };
// [END dataform_v1_dataform_teamfolder_update]
