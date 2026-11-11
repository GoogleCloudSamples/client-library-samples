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

// [START file_v1_cloudfilestoremanager_backup_get]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Retrieves details of an existing Filestore backup.
 *
 * @param {string} locationId - The Google Cloud region where the Filestore backup is located (for example, 'us-central1').
 * @param {string} backupId - The ID of the Filestore backup to retrieve (for example, 'example-backup').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getBackup(locationId, backupId, projectId) {
  const name = `projects/${projectId}/locations/${locationId}/backups/${backupId}`;

  try {
    const [backup] = await client.getBackup({name});

    console.log(`Backup retrieved: ${backup.name}`);
    console.log(`Capacity: ${backup.capacityGb} GiB`);
    console.log(`State: ${backup.state}`);
    console.log(`Source instance: ${backup.sourceInstance}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Filestore backup not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Filestore backup: ${name}`);
    } else {
      console.error(`Error retrieving Filestore backup: ${err.message}`);
    }
  }
}

module.exports = { getBackup };
// [END file_v1_cloudfilestoremanager_backup_get]
