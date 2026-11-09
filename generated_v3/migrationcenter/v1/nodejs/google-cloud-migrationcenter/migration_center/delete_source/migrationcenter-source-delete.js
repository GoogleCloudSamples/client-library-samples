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

// [START migrationcenter_v1_migrationcenter_source_delete]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the deleteSource method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the Migration Center resource.
 * @param {string} sourceId - The ID of the Migration Center source to delete.
 */
async function deleteSource(projectId, locationId, sourceId) {
  try {
    const name = client.sourcePath(projectId, locationId, sourceId);

    // DeleteSource is a long-running operation
    const [operation] = await client.deleteSource({name});
    await operation.promise();

    console.log(`Source deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Source not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteSource };
// [END migrationcenter_v1_migrationcenter_source_delete]
