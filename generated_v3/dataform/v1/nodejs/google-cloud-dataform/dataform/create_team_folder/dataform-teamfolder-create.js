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

// [START dataform_v1_dataform_teamfolder_create]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the createTeamFolder method.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the team folder is created (for example, 'us-central1').
 */
async function createTeamFolder(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const teamFolder = {
      displayName: 'Example Team Folder',
    };

    const [response] = await client.createTeamFolder({
      parent,
      teamFolder,
      teamFolderId: 'example-team-folder',
    });

    console.log(`Created team folder: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Team folder already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create team folder: ${err.message}`);
    }
  }
}

module.exports = { createTeamFolder };
// [END dataform_v1_dataform_teamfolder_create]
