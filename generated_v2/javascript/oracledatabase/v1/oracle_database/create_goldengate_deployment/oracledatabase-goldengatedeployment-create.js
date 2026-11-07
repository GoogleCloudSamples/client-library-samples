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

// [START oracledatabase_v1_oracledatabase_goldengatedeployment_create]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Use the createGoldengateDeployment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the GoldenGate deployment is located (for example, 'us-central1').
 * @param {string} goldengateDeploymentId - The caller-chosen ID for the GoldengateDeployment (for example, 'sample-gg-deployment').
 * @param {string} odbSubnetId - The resource name or ID of the existing ODB Subnet associated with the GoldenGate deployment for IP allocation.
 */
async function createGoldengateDeployment(projectId, locationId, goldengateDeploymentId, odbSubnetId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const goldengateDeployment = {
      displayName: 'Sample GoldenGate Deployment',
      odbSubnet: odbSubnetId,
      properties: {
        deploymentType: 'OGG',
        oggData: {
          deployment: 'oggdeployment1',
          adminUsername: 'oggadmin',
          adminPassword: 'example-password123!',
        },
      },
    };

    // Initialize the long-running operation to create the GoldenGate deployment.
    const [operation] = await client.createGoldengateDeployment({
      parent,
      goldengateDeploymentId,
      goldengateDeployment,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Created GoldenGate deployment: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`GoldenGate deployment already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createGoldengateDeployment };
// [END oracledatabase_v1_oracledatabase_goldengatedeployment_create]
