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

// [START datamigration_v1_datamigrationservice_connectionprofile_delete]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the deleteConnectionProfile method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the connection profile is located.
 * @param {string} connectionProfileId - The caller-chosen identifier of the connection profile to delete.
 */
async function deleteConnectionProfile(projectId, locationId, connectionProfileId) {
  const name = client.connectionProfilePath(
    projectId,
    locationId,
    connectionProfileId
  );

  try {
    // DeleteConnectionProfile initiates a long-running operation.
    const [operation] = await client.deleteConnectionProfile({name});

    // Wait for the deletion operation to complete.
    await operation.promise();

    console.log(`Successfully deleted connection profile: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection profile not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `Connection profile cannot be deleted while referenced by active migration jobs: ${name}`
      );
    } else {
      console.error(`Error deleting connection profile ${name}:`, err.message);
    }
    throw err;
  }
}

module.exports = { deleteConnectionProfile };
// [END datamigration_v1_datamigrationservice_connectionprofile_delete]
