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

// [START metastore_v1_dataprocmetastore_backup_get]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Retrieves a Dataproc Metastore backup.
 *
 * @param {string} locationId - The Google Cloud region where the Dataproc Metastore service is located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the Dataproc Metastore service.
 * @param {string} backupId - The ID of the Dataproc Metastore backup to retrieve.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getBackup(locationId, serviceId, backupId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}/backups/${backupId}`;
    const request = {
      name,
    };

    const [backup] = await client.getBackup(request);
    console.log(`Retrieved backup: ${backup.name}`);
    console.log(`State: ${backup.state}`);
    return backup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing backup: ${err.message}`);
    } else {
      console.error(`API error retrieving backup: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackup };
// [END metastore_v1_dataprocmetastore_backup_get]
