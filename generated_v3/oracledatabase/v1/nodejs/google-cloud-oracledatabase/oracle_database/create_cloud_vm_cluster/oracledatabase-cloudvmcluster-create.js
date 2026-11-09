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

// [START oracledatabase_v1_oracledatabase_cloudvmcluster_create]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Creates a Cloud VM Cluster on an existing Cloud Exadata Infrastructure.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} cloudVmClusterId - Caller-chosen unique identifier for the VM Cluster.
 * @param {string} cloudExadataInfrastructureId - ID of an existing Cloud Exadata Infrastructure.
 */
async function createCloudVmCluster(
  projectId,
  locationId,
  cloudVmClusterId,
  cloudExadataInfrastructureId
) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const exadataInfrastructure = cloudExadataInfrastructureId.startsWith('projects/')
      ? cloudExadataInfrastructureId
      : `projects/${projectId}/locations/${locationId}/cloudExadataInfrastructures/${cloudExadataInfrastructureId}`;

    const cloudVmCluster = {
      exadataInfrastructure,
      displayName: cloudVmClusterId,
      properties: {
        licenseType: 'LICENSE_INCLUDED',
        cpuCoreCount: 2,
      },
    };

    const [operation] = await client.createCloudVmCluster({
      parent,
      cloudVmClusterId,
      cloudVmCluster,
    });

    const [response] = await operation.promise();
    console.log(`Created Cloud VM Cluster: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Cloud VM Cluster already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Cloud Exadata Infrastructure not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request parameters: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createCloudVmCluster};
// [END oracledatabase_v1_oracledatabase_cloudvmcluster_create]
