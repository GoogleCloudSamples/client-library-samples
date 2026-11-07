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

// [START dataform_v1beta1_dataform_query_folder_contents]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Queries the contents of a Dataform folder.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} folderId - The server-generated ID of the Folder (for example, read from an existing Folder created in Dataform).
 */
async function queryFolderContents(projectId, locationId, folderId) {
  try {
    const folder = `projects/${projectId}/locations/${locationId}/folders/${folderId}`;

    const request = {
      folder,
    };

    const [response] = await client.queryFolderContents(request);

    console.log(`Queried contents for folder: ${folder}`);
    console.log(response);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Folder not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to query folder contents: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { queryFolderContents };
// [END dataform_v1beta1_dataform_query_folder_contents]
