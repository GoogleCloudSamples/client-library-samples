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

// [START migrationcenter_v1_migrationcenter_importjob_create]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Creates an import job in Migration Center.
 *
 * @param {string} importJobId - The identifier for the import job.
 */
async function createImportJob(importJobId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);
    const sourceId = 'default';
    const importJob = {
      displayName: 'Import Job',
      assetSource: client.sourcePath(projectId, location, sourceId),
    };

    const request = {
      parent,
      importJobId,
      importJob,
    };

    const [operation] = await client.createImportJob(request);
    const [response] = await operation.promise();

    console.log(`Created import job: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Import job already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { createImportJob };
// [END migrationcenter_v1_migrationcenter_importjob_create]
