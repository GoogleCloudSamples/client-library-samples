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

// [START datamigration_v1_datamigrationservice_connectionprofile_update]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the updateConnectionProfile method
 *
 * @param {string} projectId - The Google Cloud project ID containing the connection profile.
 * @param {string} locationId - The Google Cloud region where the connection profile resides.
 * @param {string} connectionProfileId - The ID of the existing connection profile to update.
 */
async function updateConnectionProfile(projectId, locationId, connectionProfileId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };

    const connectionProfile = {
      name: `projects/${projectId}/locations/${locationId}/connectionProfiles/${connectionProfileId}`,
      displayName: 'Updated Connection Profile',
    };

    const request = {
      updateMask,
      connectionProfile,
    };

    // Initiate the long-running operation to update the connection profile
    const [operation] = await client.updateConnectionProfile(request);

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Updated connection profile: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection profile not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API error updating connection profile: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateConnectionProfile };
// [END datamigration_v1_datamigrationservice_connectionprofile_update]
