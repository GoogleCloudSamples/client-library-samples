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

// [START bigtable_v2_bigtabletableadmin_backup_delete]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Deletes an existing Bigtable backup.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The caller-chosen ID of the Bigtable instance (for example, 'example-instance').
 * @param {string} clusterId - The caller-chosen ID of the Bigtable cluster (for example, 'example-cluster').
 * @param {string} backupId - The caller-chosen ID of the Bigtable backup to delete (for example, 'example-backup').
 */
async function deleteBackup(projectId, instanceId, clusterId, backupId) {
  const name = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}/backups/${backupId}`;
  try {
    const request = {
      name,
    };
    await client.deleteBackup(request);
    console.log(`Deleted backup: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting backup: ${err.message}`);
    } else {
      console.error(`Failed to delete backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackup };
// [END bigtable_v2_bigtabletableadmin_backup_delete]
