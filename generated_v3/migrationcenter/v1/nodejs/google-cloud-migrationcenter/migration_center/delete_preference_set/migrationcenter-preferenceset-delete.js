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

// [START migrationcenter_v1_migrationcenter_preferenceset_delete]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the deletePreferenceSet method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the preference set resides.
 * @param {string} preferenceSetId - The identifier of the preference set to delete.
 */
async function deletePreferenceSet(projectId, locationId, preferenceSetId) {
  const name = `projects/${projectId}/locations/${locationId}/preferenceSets/${preferenceSetId}`;

  try {
    const request = {
      name,
    };

    // DeletePreferenceSet initiates a long-running operation
    const [operation] = await client.deletePreferenceSet(request);
    await operation.promise();

    console.log(`Deleted preference set: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Preference set not found: ${name}`);
    } else if (err.code) {
      console.error(`API error (Code ${err.code}): ${err.details || err.message}`);
    } else {
      console.error('Non-API error occurred:', err);
    }
  }
}

module.exports = { deletePreferenceSet };
// [END migrationcenter_v1_migrationcenter_preferenceset_delete]
