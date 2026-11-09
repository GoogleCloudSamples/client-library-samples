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

// [START oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Creates a Cloud Exadata Infrastructure resource in Oracle Database@Google Cloud.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} cloudExadataInfrastructureId - ID for the new infrastructure (for example, 'example-infrastructure-id').
 */
async function createCloudExadataInfrastructure(projectId, locationId, cloudExadataInfrastructureId) {
  const parent = client.locationPath(projectId, locationId);
  const cloudExadataInfrastructure = {
    displayName: 'Example Exadata Infrastructure',
    properties: {
      shape: 'Exadata.X9M',
      computeCount: 2,
      storageCount: 3,
    },
  };

  const request = {
    parent,
    cloudExadataInfrastructureId,
    cloudExadataInfrastructure,
  };

  try {
    const [operation] = await client.createCloudExadataInfrastructure(request);
    const [response] = await operation.promise();

    console.log(`Created Cloud Exadata Infrastructure: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Resource already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT || err.code === status.FAILED_PRECONDITION) {
      console.log(`Request cannot be processed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied: ${err.message}`);
    } else {
      console.log(`Failed to create Cloud Exadata Infrastructure: ${err.message}`);
    }
  }
}

module.exports = { createCloudExadataInfrastructure };
// [END oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
