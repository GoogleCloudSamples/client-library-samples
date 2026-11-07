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

// [START dataform_v1_dataform_write_file]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the writeFile method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (e.g., 'us-central1').
 * @param {string} repositoryId - The Dataform repository ID.
 * @param {string} workspaceId - The Dataform workspace ID.
 */
async function writeFile(projectId, locationId, repositoryId, workspaceId) {
  try {
    const workspace = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/workspaces/${workspaceId}`;
    const path = 'definitions/quickstart_table.sqlx';
    const contents = Buffer.from('config { type: "table" }\nSELECT 1 AS count;');

    const request = {
      workspace,
      path,
      contents,
    };

    await client.writeFile(request);
    console.log(`Successfully wrote file to ${path} in workspace ${workspace}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workspace or resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`File already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Dataform API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
    throw err;
  }
}

module.exports = { writeFile };
// [END dataform_v1_dataform_write_file]
