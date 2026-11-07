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

// [START datamigration_v1_datamigrationservice_privateconnection_delete]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the deletePrivateConnection method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the private connection.
 * @param {string} locationId - The Google Cloud region where the private connection is located.
 * @param {string} privateConnectionId - The caller-chosen ID of the private connection to delete.
 */
async function deletePrivateConnection(projectId, locationId, privateConnectionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/privateConnections/${privateConnectionId}`;
    const request = {
      name,
    };

    // Initiate the long-running operation to delete the private connection
    const [operation] = await client.deletePrivateConnection(request);

    // Wait for the deletion operation to complete
    await operation.promise();

    console.log(`Deleted private connection: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Private connection not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Private connection is in use or cannot be deleted: ${err.message}`);
    } else if (err.code) {
      console.error(`Operation failed with gRPC status ${err.code}: ${err.message}`);
    } else {
      console.error(`Failed to delete private connection: ${err.message}`);
    }
  }
}

module.exports = { deletePrivateConnection };
// [END datamigration_v1_datamigrationservice_privateconnection_delete]
