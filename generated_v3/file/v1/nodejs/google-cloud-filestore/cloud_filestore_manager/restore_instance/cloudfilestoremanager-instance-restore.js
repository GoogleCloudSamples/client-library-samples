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

// [START file_v1_cloudfilestoremanager_restore_instance]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the restoreInstance method
 *
 * @param {string} locationId - The Google Cloud location (zone) of the Filestore instance (for example, 'us-central1-c').
 * @param {string} instanceId - ID of the Filestore instance (for example, 'example-instance').
 * @param {string} sourceBackup - The resource name of the backup to restore from, in the format 'projects/{project_id}/locations/{location_id}/backups/{backup_id}'.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} fileShare - The name of the file share in the Filestore instance that the backup is being restored to.
 */
async function restoreInstance(locationId, instanceId, sourceBackup, projectId, fileShare) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;
    const request = {
      name,
      fileShare,
      sourceBackup,
    };

    const [operation] = await client.restoreInstance(request);
    const [response] = await operation.promise();

    console.log(`Filestore instance restored: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance or backup not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Restore instance operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { restoreInstance };
// [END file_v1_cloudfilestoremanager_restore_instance]
