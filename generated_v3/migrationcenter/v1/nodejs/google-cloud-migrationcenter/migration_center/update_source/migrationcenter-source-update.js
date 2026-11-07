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

// [START migrationcenter_v1_migrationcenter_source_update]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the updateSource method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the Migration Center source.
 * @param {string} sourceId - The caller-chosen identifier of the Migration Center source to update.
 */
async function updateSource(projectId, locationId, sourceId) {
  try {
    const source = {
      name: `projects/${projectId}/locations/${locationId}/sources/${sourceId}`,
      description: 'Updated source description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // UpdateSource initiates a long-running operation
    const [operation] = await client.updateSource({
      source,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated source: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Source not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update source: ${err.message}`);
    }
  }
}

module.exports = { updateSource };
// [END migrationcenter_v1_migrationcenter_source_update]
