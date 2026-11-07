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

// [START migrationcenter_v1_migrationcenter_importjob_update]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Updates an existing ImportJob in Migration Center.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} importJobId - The identifier of the existing ImportJob to update.
 */
async function updateImportJob(projectId, locationId, importJobId) {
  try {
    const importJob = {
      name: `projects/${projectId}/locations/${locationId}/importJobs/${importJobId}`,
      displayName: 'Updated Import Job',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      importJob,
      updateMask,
    };

    // Initiate the long-running operation to update the import job.
    const [operation] = await client.updateImportJob(request);
    const [response] = await operation.promise();

    console.log(`Updated import job: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Import job not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateImportJob };
// [END migrationcenter_v1_migrationcenter_importjob_update]
