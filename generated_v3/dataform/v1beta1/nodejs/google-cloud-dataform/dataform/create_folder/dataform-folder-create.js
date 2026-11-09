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

// [START dataform_v1beta1_dataform_folder_create]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Creates a folder in Dataform.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId Google Cloud region (for example, 'us-central1').
 */
async function createFolder(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const folder = {
      displayName: `example-folder-${Date.now()}`,
    };

    const [response] = await client.createFolder({
      parent,
      folder,
    });

    console.log(`Created folder: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Folder already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to create folder: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { createFolder };
// [END dataform_v1beta1_dataform_folder_create]
