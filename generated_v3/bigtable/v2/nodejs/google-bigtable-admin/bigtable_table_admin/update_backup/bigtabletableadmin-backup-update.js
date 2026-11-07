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

// [START bigtable_v2_bigtabletableadmin_backup_update]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Updates the expire time of an existing Cloud Bigtable backup.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the existing Cloud Bigtable instance.
 * @param {string} clusterId - The ID of the existing Cloud Bigtable cluster.
 * @param {string} backupId - The ID of the existing Cloud Bigtable backup to update.
 */
async function updateBackup(projectId, instanceId, clusterId, backupId) {
  try {
    const updateMask = {
      paths: ['expire_time'],
    };

    // Sets the expiration time to 7 days from the current time
    const expireTimeSeconds = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const backup = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}/backups/${backupId}`,
      expireTime: {
        seconds: expireTimeSeconds,
        nanos: 0,
      },
    };

    const [updatedBackup] = await client.updateBackup({
      backup,
      updateMask,
    });

    console.log(`Updated backup: ${updatedBackup.name}`);
    console.log(
      `Updated expire time: ${new Date(Number(updatedBackup.expireTime.seconds) * 1000).toISOString()}`
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Error updating backup: ${err.message}`);
    }
  }
}

module.exports = {updateBackup};
// [END bigtable_v2_bigtabletableadmin_backup_update]
