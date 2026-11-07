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

// [START metastore_v1alpha_dataprocmetastore_backup_delete]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Use the deleteBackup method
 *
 * @param {string} locationId - The Google Cloud region where the Dataproc Metastore service is located.
 * @param {string} serviceId - The ID of the Dataproc Metastore service.
 * @param {string} backupId - The ID of the Dataproc Metastore backup to delete.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteBackup(locationId, serviceId, backupId, projectId) {
  try {
    const name = client.backupPath(
      projectId,
      locationId,
      serviceId,
      backupId
    );

    const [operation] = await client.deleteBackup({name});
    await operation.promise();

    console.log(`Deleted backup: ${name}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteBackup };
// [END metastore_v1alpha_dataprocmetastore_backup_delete]
