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

// [START oracledatabase_v1_oracledatabase_goldengatedeploymentversions_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists the GoldenGate deployment versions for a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listGoldengateDeploymentVersions(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listGoldengateDeploymentVersions(request);

    for (const version of response) {
      console.log(`Deployment Version: ${version.name}`);
      console.log(`Version: ${version.version}`);
    }
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.message &&
      err.message.toLowerCase().includes('marketplace order')
    ) {
      // In environments where the Oracle Database Marketplace subscription is not yet finalized,
      // log the prerequisite notice to standard output rather than treating it as an unhandled error.
      console.log(
        `A marketplace order is required to access Oracle Database resources: ${err.message}`
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(
        `Resource not found for parent ${projectId}/${locationId}: ${err.message}`
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(
        `API operation failed with code ${err.code}: ${err.message}`
      );
    }
  }
}

module.exports = {listGoldengateDeploymentVersions};
// [END oracledatabase_v1_oracledatabase_goldengatedeploymentversions_list]
