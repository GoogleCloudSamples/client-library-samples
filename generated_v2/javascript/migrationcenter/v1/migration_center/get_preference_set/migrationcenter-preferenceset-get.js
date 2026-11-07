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

// [START migrationcenter_v1_migrationcenter_preferenceset_get]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the getPreferenceSet method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) where the preference set resides.
 * @param {string} preferenceSetId - The user-specified ID of the preference set to retrieve.
 */
async function getPreferenceSet(projectId, locationId, preferenceSetId) {
  try {
    const name = client.preferenceSetPath(
      projectId,
      locationId,
      preferenceSetId
    );

    const [preferenceSet] = await client.getPreferenceSet({name});

    console.log(`Preference set name: ${preferenceSet.name}`);
    console.log(`Description: ${preferenceSet.description || 'None'}`);
    return preferenceSet;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Preference set not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing preference set: ${err.message}`);
    } else {
      console.error(`RPC error getting preference set: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPreferenceSet };
// [END migrationcenter_v1_migrationcenter_preferenceset_get]
