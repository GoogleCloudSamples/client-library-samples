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

// [START cloudsecuritycompliance_v1_deployment_frameworkdeployment_delete]
'use strict';

const {DeploymentClient} = require('@google-cloud/cloudsecuritycompliance');
const {status} = require('@grpc/grpc-js');

const client = new DeploymentClient();

/**
 * Use the deleteFrameworkDeployment method
 *
 * @param {string} organizationId - The Google Cloud organization ID.
 * @param {string} locationId - The Google Cloud location where the service is located. The only supported location is 'global'.
 * @param {string} frameworkDeploymentId - The identifier of the framework deployment to delete.
 */
async function deleteFrameworkDeployment(organizationId, locationId, frameworkDeploymentId) {
  try {
    const name = `organizations/${organizationId}/locations/${locationId}/frameworkDeployments/${frameworkDeploymentId}`;

    // Initiates the long-running operation to delete the framework deployment
    const [operation] = await client.deleteFrameworkDeployment({name});

    // Waits for the deletion operation to complete
    await operation.promise();

    console.log(`Deleted framework deployment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Framework deployment not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteFrameworkDeployment };
// [END cloudsecuritycompliance_v1_deployment_frameworkdeployment_delete]
