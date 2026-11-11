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

// [START datamigration_v1_datamigrationservice_privateconnection_get]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Retrieves details of an existing private connection in Database Migration Service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the private connection is located (for example, us-central1).
 * @param {string} privateConnectionId - The identifier of the existing private connection to retrieve.
 */
async function getPrivateConnection(projectId, locationId, privateConnectionId) {
  try {
    const name = client.privateConnectionPath(
      projectId,
      locationId,
      privateConnectionId
    );

    const [response] = await client.getPrivateConnection({name});

    console.log(`Private connection: ${response.name}`);
    console.log(`State: ${response.state}`);
    console.log(`Network: ${response.vpcPeeringConfig?.vpcNetwork}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Private connection not found: ${err.message}`);
    } else {
      console.error(`Failed to retrieve private connection: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPrivateConnection };
// [END datamigration_v1_datamigrationservice_privateconnection_get]
