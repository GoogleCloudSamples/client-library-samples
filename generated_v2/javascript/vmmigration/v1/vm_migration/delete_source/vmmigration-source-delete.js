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

// [START vmmigration_v1_vmmigration_source_delete]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Use the deleteSource method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (e.g., us-central1).
 * @param {string} sourceId - The identifier of the Source to delete.
 */
async function deleteSource(projectId, locationId, sourceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/sources/${sourceId}`;

    const [operation] = await client.deleteSource({name});
    console.log(`Deletion initiated for source: ${name}`);

    // DeleteSource is a long-running operation; wait for completion.
    await operation.promise();
    console.log(`Successfully deleted source: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Source not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteSource };
// [END vmmigration_v1_vmmigration_source_delete]
