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

// [START datamigration_v1_datamigrationservice_rollback_conversion_workspace]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Rolls back a conversion workspace to the last committed snapshot.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the conversion workspace is located.
 * @param {string} conversionWorkspaceId - The identifier of the conversion workspace to roll back.
 */
async function rollbackConversionWorkspace(projectId, locationId, conversionWorkspaceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/conversionWorkspaces/${conversionWorkspaceId}`;

    const request = {
      name,
    };

    // Initiates the rollback operation and waits for completion.
    const [operation] = await client.rollbackConversionWorkspace(request);
    const [response] = await operation.promise();

    console.log(`Rolled back conversion workspace: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Conversion workspace not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during rollback: ${err.message}`);
    } else {
      console.error(`Failed to roll back conversion workspace: ${err.message}`);
    }
  }
}

module.exports = { rollbackConversionWorkspace };
// [END datamigration_v1_datamigrationservice_rollback_conversion_workspace]
