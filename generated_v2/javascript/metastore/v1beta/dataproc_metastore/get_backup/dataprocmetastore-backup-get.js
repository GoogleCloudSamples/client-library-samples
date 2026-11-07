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

// [START metastore_v1beta_dataprocmetastore_backup_get]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Retrieves a Dataproc Metastore backup.
 *
 * @param {string} locationId - The Google Cloud region where the Dataproc Metastore service and backup are located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the Dataproc Metastore service (for example, 'example-service').
 * @param {string} backupId - The ID of the Dataproc Metastore backup (for example, 'example-backup').
 * @param {string} projectId - The Google Cloud project ID of the metastore service backup.
 */
async function getBackup(locationId, serviceId, backupId, projectId) {
  const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}/backups/${backupId}`;

  try {
    const request = {
      name,
    };

    const [backup] = await client.getBackup(request);
    console.log(`Backup name: ${backup.name}`);
    console.log(`Backup state: ${backup.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing backup: ${name}`);
    } else {
      console.error(`Failed to get backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackup };
// [END metastore_v1beta_dataprocmetastore_backup_get]
