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

// [START file_v1beta1_cloudfilestoremanager_backup_get]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the getBackup method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupId - ID of the Backup (for example, 'example-backup-id')
 */
async function getBackup(projectId, locationId, backupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backups/${backupId}`;
    const request = {
      name,
    };

    const [backup] = await client.getBackup(request);
    console.log(`Backup retrieved: ${backup.name}`);
    console.log(`State: ${backup.state}`);
    console.log(`Capacity (GiB): ${backup.capacityGb}`);
    return backup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing backup: ${err.message}`);
    } else {
      console.error(`API error retrieving backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackup };
// [END file_v1beta1_cloudfilestoremanager_backup_get]
