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

// [START file_v1beta1_cloudfilestoremanager_backup_delete]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Deletes a Filestore backup.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the Filestore backup is located (for example, 'us-central1').
 * @param {string} backupId - The caller-chosen ID of the Filestore backup to delete (for example, 'example-backup').
 */
async function deleteBackup(projectId, locationId, backupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backups/${backupId}`;

    const [operation] = await client.deleteBackup({name});
    await operation.promise();

    console.log(`Backup deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackup };
// [END file_v1beta1_cloudfilestoremanager_backup_delete]
