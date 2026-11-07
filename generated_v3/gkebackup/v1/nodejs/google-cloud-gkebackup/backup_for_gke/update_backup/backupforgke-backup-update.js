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

// [START gkebackup_v1_backupforgke_backup_update]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Use the updateBackup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Backup is located.
 * @param {string} backupPlanId - The client-provided or server-assigned ID of the parent BackupPlan.
 * @param {string} backupId - The ID of the Backup to update.
 */
async function updateBackup(projectId, locationId, backupPlanId, backupId) {
  try {
    const backup = {
      name: `projects/${projectId}/locations/${locationId}/backupPlans/${backupPlanId}/backups/${backupId}`,
      description: 'Updated backup description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateBackup({
      backup,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated backup: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateBackup };
// [END gkebackup_v1_backupforgke_backup_update]
