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

// [START migrationcenter_v1_migrationcenter_importjobs_list]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the listImportJobs method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where Migration Center resources are located.
 */
async function listImportJobs(projectId, locationId) {
  try {
    // Construct the parent resource path from identifiers
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [importJobs] = await client.listImportJobs(request);

    console.log('Import jobs:');
    for (const job of importJobs) {
      console.log(`Name: ${job.name}, State: ${job.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list import jobs: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { listImportJobs };
// [END migrationcenter_v1_migrationcenter_importjobs_list]
