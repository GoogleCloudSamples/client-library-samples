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

// [START datamigration_v1_datamigrationservice_connectionprofile_get]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Retrieves details of a specific connection profile.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the connection profile (for example, 'us-central1').
 * @param {string} connectionProfileId - The caller-assigned identifier of the existing connection profile to retrieve.
 */
async function getConnectionProfile(projectId, locationId, connectionProfileId) {
  const name = client.connectionProfilePath(
    projectId,
    locationId,
    connectionProfileId
  );

  try {
    const [connectionProfile] = await client.getConnectionProfile({name});

    console.log(`Connection profile name: ${connectionProfile.name}`);
    console.log(`Display name: ${connectionProfile.displayName}`);
    console.log(`State: ${connectionProfile.state}`);
    console.log(`Provider: ${connectionProfile.provider}`);

    return connectionProfile;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection profile not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing connection profile: ${name}`);
    } else {
      console.error(`Error retrieving connection profile: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getConnectionProfile };
// [END datamigration_v1_datamigrationservice_connectionprofile_get]
