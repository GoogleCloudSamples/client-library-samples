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

// [START migrationcenter_v1_migrationcenter_preferenceset_update]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the updatePreferenceSet method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} preferenceSetId - The ID of the preference set to update.
 */
async function updatePreferenceSet(projectId, locationId, preferenceSetId) {
  try {
    const preferenceSet = {
      name: client.preferenceSetPath(projectId, locationId, preferenceSetId),
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // Initiate the long-running operation to update the preference set
    const [operation] = await client.updatePreferenceSet({
      preferenceSet,
      updateMask,
    });

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Updated preference set: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Preference set not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update preference set: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updatePreferenceSet };
// [END migrationcenter_v1_migrationcenter_preferenceset_update]
