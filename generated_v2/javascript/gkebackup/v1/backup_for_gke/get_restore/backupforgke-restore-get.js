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

// [START gkebackup_v1_backupforgke_restore_get]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Retrieves an existing Restore resource.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Backup for GKE resources.
 * @param {string} locationId - The Google Cloud region where the RestorePlan and Restore are located (for example, 'us-central1').
 * @param {string} restorePlanId - The caller-chosen ID of the RestorePlan containing the Restore.
 * @param {string} restoreId - The caller-chosen ID of the Restore to retrieve.
 */
async function getRestore(projectId, locationId, restorePlanId, restoreId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/restorePlans/${restorePlanId}/restores/${restoreId}`;

    const [restore] = await client.getRestore({name});

    console.log(`Restore name: ${restore.name}`);
    console.log(`Restore state: ${restore.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Restore not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve restore: ${err.message}`);
    }
  }
}

module.exports = { getRestore };
// [END gkebackup_v1_backupforgke_restore_get]
