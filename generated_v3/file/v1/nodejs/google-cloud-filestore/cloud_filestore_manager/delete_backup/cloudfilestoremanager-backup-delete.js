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

// [START file_v1_cloudfilestoremanager_backup_delete]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the deleteBackup method
 *
 * @param {string} locationId - The Google Cloud region of the Filestore backup (for example, 'us-central1').
 * @param {string} backupId - The ID of the Filestore backup to delete. Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.
 * @param {string} projectId - The ID of the Google Cloud project where the Filestore backup is located.
 */
async function deleteBackup(locationId, backupId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backups/${backupId}`;

    const [operation] = await client.deleteBackup({name});
    console.log(`Delete operation started for backup: ${name}`);

    // Wait for the long-running operation to complete.
    await operation.promise();
    console.log(`Backup successfully deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Filestore API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackup };
// [END file_v1_cloudfilestoremanager_backup_delete]
