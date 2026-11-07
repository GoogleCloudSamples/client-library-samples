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

// [START file_v1_cloudfilestoremanager_backup_update]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the updateBackup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Filestore backup is located.
 * @param {string} backupId - The ID of the Filestore backup to update.
 */
async function updateBackup(projectId, locationId, backupId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const backup = {
      name: `projects/${projectId}/locations/${locationId}/backups/${backupId}`,
      description: 'Updated backup description',
    };

    const request = {
      backup,
      updateMask,
    };

    const [operation] = await client.updateBackup(request);
    const [response] = await operation.promise();

    console.log(`Updated backup: ${response.name}`);
    console.log(`Backup description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`Filestore API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateBackup };
// [END file_v1_cloudfilestoremanager_backup_update]
