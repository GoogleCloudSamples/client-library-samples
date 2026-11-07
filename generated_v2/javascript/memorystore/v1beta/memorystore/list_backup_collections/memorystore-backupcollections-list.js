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

// [START memorystore_v1beta_memorystore_backupcollections_list]
'use strict';

const {MemorystoreClient} = require('@google-cloud/memorystore');
const {status} = require('@grpc/grpc-js');

const client = new MemorystoreClient();

/**
 * Lists Memorystore backup collections in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listBackupCollections(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [backupCollections] = await client.listBackupCollections(request);

    for (const collection of backupCollections) {
      console.log(`Backup collection: ${collection.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for parent: projects/${projectId}/locations/${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing parent: projects/${projectId}/locations/${locationId}`);
    } else {
      console.error(`API error listing backup collections: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackupCollections };
// [END memorystore_v1beta_memorystore_backupcollections_list]
