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

// [START infra-manager_v1_config_deploymentgroup_delete]
'use strict';

const {ConfigClient} = require('@google-cloud/config');
const {status} = require('@grpc/grpc-js');

const client = new ConfigClient();

/**
 * Use the deleteDeploymentGroup method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} deploymentGroupId - ID of the DeploymentGroup (for example, 'example-deploymentgroup-id')
 */
async function deleteDeploymentGroup(projectId, locationId, deploymentGroupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deploymentGroups/${deploymentGroupId}`;

    // Initiate the long-running operation to delete the deployment group
    const [operation] = await client.deleteDeploymentGroup({name});
    await operation.promise();

    console.log(`Deleted deployment group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Deployment group not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { deleteDeploymentGroup };
// [END infra-manager_v1_config_deploymentgroup_delete]
