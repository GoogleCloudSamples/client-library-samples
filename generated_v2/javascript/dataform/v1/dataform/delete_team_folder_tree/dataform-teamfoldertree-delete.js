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

// [START dataform_v1_dataform_teamfoldertree_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the deleteTeamFolderTree method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} teamFolderId - The server-generated ID of the TeamFolder (for example, 'example-teamfolder-id'). Read this value from an existing resource.
 * @param {boolean} force - Optional. If true, permanently deletes the team folder tree along with all contents including release configs and workflow configs. If false, deletion fails if release or workflow configs exist.
 */
async function deleteTeamFolderTree(projectId, locationId, teamFolderId, force) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/teamFolders/${teamFolderId}`;

    const request = {
      name,
      force,
    };

    // Initiates a long-running operation to delete the team folder tree
    const [operation] = await client.deleteTeamFolderTree(request);
    await operation.promise();

    console.log(`Deleted team folder tree: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Team folder tree not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`Dataform API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteTeamFolderTree };
// [END dataform_v1_dataform_teamfoldertree_delete]
