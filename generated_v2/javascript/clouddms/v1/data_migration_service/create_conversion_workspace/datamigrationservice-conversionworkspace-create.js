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

// [START datamigration_v1_datamigrationservice_conversionworkspace_create]
'use strict';

const {DataMigrationServiceClient} = require('@google-cloud/dms');
const {status} = require('@grpc/grpc-js');

const client = new DataMigrationServiceClient();

/**
 * Use the createConversionWorkspace method
 *
 * @param {string} conversionWorkspaceId - A caller-chosen unique identifier for the conversion workspace (for example, 'example-conversion-workspace'). Must start with a letter and contain only lowercase letters, digits, and hyphens.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function createConversionWorkspace(conversionWorkspaceId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const conversionWorkspace = {
      displayName: 'Example Conversion Workspace',
      source: {
        engine: 'ORACLE',
        version: '19c',
      },
      destination: {
        engine: 'POSTGRESQL',
        version: '14',
      },
    };

    const request = {
      parent,
      conversionWorkspaceId,
      conversionWorkspace,
    };

    const [operation] = await client.createConversionWorkspace(request);
    const [response] = await operation.promise();

    console.log(`Conversion workspace created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Conversion workspace already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createConversionWorkspace };
// [END datamigration_v1_datamigrationservice_conversionworkspace_create]
