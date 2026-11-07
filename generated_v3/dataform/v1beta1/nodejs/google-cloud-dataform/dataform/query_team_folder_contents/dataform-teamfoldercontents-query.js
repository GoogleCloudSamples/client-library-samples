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

// [START dataform_v1beta1_dataform_query_team_folder_contents]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the queryTeamFolderContents method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region hosting the Dataform team folder (for example, 'us-central1').
 * @param {string} teamFolderId - The server-generated ID of the Dataform TeamFolder.
 */
async function queryTeamFolderContents(projectId, locationId, teamFolderId) {
  try {
    const teamFolder = `projects/${projectId}/locations/${locationId}/teamFolders/${teamFolderId}`;

    const [response] = await client.queryTeamFolderContents({
      teamFolder,
    });

    const entries = Array.isArray(response)
      ? response
      : response?.teamFolderEntries ?? [];

    console.log(`Queried team folder: ${teamFolder}`);
    console.log(`Total entries returned: ${entries.length}`);
    for (const entry of entries) {
      console.log(entry);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Team folder not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error querying team folder contents: ${err.message}`);
    }
  }
}

module.exports = { queryTeamFolderContents };
// [END dataform_v1beta1_dataform_query_team_folder_contents]
