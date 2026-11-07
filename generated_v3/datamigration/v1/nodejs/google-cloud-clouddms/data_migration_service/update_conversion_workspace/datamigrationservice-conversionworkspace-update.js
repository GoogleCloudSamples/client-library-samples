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

// [START datamigration_v1_datamigrationservice_conversionworkspace_update]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the updateConversionWorkspace method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (e.g., 'us-central1').
 * @param {string} conversionWorkspaceId - The ID of the existing conversion workspace.
 */
async function updateConversionWorkspace(projectId, locationId, conversionWorkspaceId) {
  try {
    const conversionWorkspace = {
      name: `projects/${projectId}/locations/${locationId}/conversionWorkspaces/${conversionWorkspaceId}`,
      displayName: 'Updated Conversion Workspace Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateConversionWorkspace({
      conversionWorkspace,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated conversion workspace: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Conversion workspace not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update conversion workspace: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateConversionWorkspace };
// [END datamigration_v1_datamigrationservice_conversionworkspace_update]
