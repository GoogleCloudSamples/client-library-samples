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

// [START migrationcenter_v1_migrationcenter_importdatafile_delete]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Deletes an import data file from a Migration Center import job.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region.
 * @param {string} importJobId - The ID of the parent import job.
 * @param {string} importDataFileId - The ID of the import data file to delete.
 */
async function deleteImportDataFile(projectId, locationId, importJobId, importDataFileId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/importJobs/${importJobId}/importDataFiles/${importDataFileId}`;

    const [operation] = await client.deleteImportDataFile({name});
    await operation.promise();

    console.log(`Deleted import data file: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete import data file: ${err.message}`);
    }
  }
}

module.exports = { deleteImportDataFile };
// [END migrationcenter_v1_migrationcenter_importdatafile_delete]
