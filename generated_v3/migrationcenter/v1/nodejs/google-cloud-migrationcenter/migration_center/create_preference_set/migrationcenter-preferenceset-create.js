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

// [START migrationcenter_v1_migrationcenter_preferenceset_create]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Creates a preference set in Migration Center.
 *
 * @param {string} preferenceSetId ID of the preference set to create.
 */
async function createPreferenceSet(preferenceSetId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);

    const preferenceSet = {
      description: 'Compute Engine migration preferences',
      displayName: 'Example Preference Set',
      virtualMachinePreferences: {
        targetProduct: 'COMPUTE_ENGINE',
      },
    };

    const request = {
      parent,
      preferenceSetId,
      preferenceSet,
    };

    const [operation] = await client.createPreferenceSet(request);
    const [response] = await operation.promise();

    console.log(`Preference set created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Preference set already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createPreferenceSet };
// [END migrationcenter_v1_migrationcenter_preferenceset_create]
