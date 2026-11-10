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

// [START gsuiteaddons_v1_gsuiteaddons_deployment_get]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Use the getDeployment method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Google Workspace add-on deployment.
 * @param {string} deploymentId - The caller-specified identifier of the deployment to retrieve.
 */
async function getDeployment(projectId, deploymentId) {
  try {
    const name = `projects/${projectId}/deployments/${deploymentId}`;

    const request = {
      name,
    };

    const [deployment] = await client.getDeployment(request);

    console.log(`Deployment Name: ${deployment.name}`);
    console.log(`Deployment ETag: ${deployment.etag}`);
    return deployment;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Deployment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error retrieving deployment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDeployment };
// [END gsuiteaddons_v1_gsuiteaddons_deployment_get]
