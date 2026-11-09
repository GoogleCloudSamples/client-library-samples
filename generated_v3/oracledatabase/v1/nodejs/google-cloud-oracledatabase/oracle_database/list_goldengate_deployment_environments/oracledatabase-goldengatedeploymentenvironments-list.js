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

// [START oracledatabase_v1_oracledatabase_goldengatedeploymentenvironments_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists the GoldenGate deployment environments in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listGoldengateDeploymentEnvironments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [environments] =
      await client.listGoldengateDeploymentEnvironments(request);

    for (const environment of environments) {
      console.log(`Deployment environment: ${environment.name}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      // Environments require an active Google Cloud Marketplace subscription order
      if (
        err.message &&
        err.message.toLowerCase().includes('marketplace order')
      ) {
        console.log(
          'A Google Cloud Marketplace order is required to access GoldenGate deployment environments.'
        );
        return;
      }
      console.log(`Request argument is invalid: ${err.details || err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(
        `Requested resource is not found: ${err.details || err.message}`
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission is denied: ${err.details || err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        `Precondition evaluation failed: ${err.details || err.message}`
      );
    } else {
      throw err;
    }
  }
}

module.exports = { listGoldengateDeploymentEnvironments };
// [END oracledatabase_v1_oracledatabase_goldengatedeploymentenvironments_list]
