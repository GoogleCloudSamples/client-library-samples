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

// [START file_v1beta1_cloudfilestoremanager_backup_create]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Creates a Filestore backup and waits for the operation to complete.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupId - The caller-chosen ID to use for the backup. Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen (for example, 'sample-backup').
 * @param {string} sourceInstance - The full resource name of the source Filestore instance to back up, in the format projects/{project_id}/locations/{location_id}/instances/{instance_id}.
 */
async function createBackup(projectId, locationId, backupId, sourceInstance) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const backup = {
      sourceInstance,
      sourceFileShare: 'vol1',
    };

    const request = {
      parent,
      backupId,
      backup,
    };

    const [operation] = await client.createBackup(request);
    const [response] = await operation.promise();

    console.log(`Backup created successfully: ${response.name}`);
    console.log(`Backup state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup ${backupId} already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createBackup };
// [END file_v1beta1_cloudfilestoremanager_backup_create]
