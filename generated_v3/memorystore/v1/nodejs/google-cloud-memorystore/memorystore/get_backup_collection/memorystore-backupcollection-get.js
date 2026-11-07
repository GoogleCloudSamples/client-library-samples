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

// [START memorystore_v1_memorystore_backupcollection_get]
'use strict';

const {MemorystoreClient} = require('@google-cloud/memorystore');
const {status} = require('@grpc/grpc-js');

const client = new MemorystoreClient();

/**
 * Use the getBackupCollection method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the backup collection is located (for example, 'us-central1').
 * @param {string} backupCollectionId - The server-generated ID of the backup collection. Retrieve this value from an existing Memorystore instance's backup_collection field or via ListBackupCollections.
 */
async function getBackupCollection(projectId, locationId, backupCollectionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupCollections/${backupCollectionId}`;

    const request = {
      name,
    };

    const [response] = await client.getBackupCollection(request);

    console.log(`Backup collection retrieved: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup collection not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve backup collection: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBackupCollection };
// [END memorystore_v1_memorystore_backupcollection_get]
