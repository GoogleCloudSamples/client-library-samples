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

// [START migrationcenter_v1_migrationcenter_source_get]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Retrieves an existing Migration Center source.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Migration Center source resides.
 * @param {string} sourceId - The ID of the Migration Center source to retrieve.
 */
async function getSource(projectId, locationId, sourceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/sources/${sourceId}`;
    const [source] = await client.getSource({name});

    console.log(`Source name: ${source.name}`);
    console.log(`Source state: ${source.state}`);
    console.log(`Source type: ${source.type}`);
    return source;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Source not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSource };
// [END migrationcenter_v1_migrationcenter_source_get]
