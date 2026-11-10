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

// [START gsuiteaddons_v1_gsuiteaddons_deployment_create]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Creates a deployment for a Google Workspace Add-on.
 *
 * @param {string} deploymentId - ID of the deployment (for example, 'example-deployment-id').
 */
async function createDeployment(deploymentId) {
  try {
    const projectNumber =
      process.env.PROJECT_NUMBER || (await client.getProjectId());
    const parent = `projects/${projectNumber}`;
    const deployment = {
      oauthScopes: [
        'https://www.googleapis.com/auth/calendar.addons.execute',
      ],
      addOns: {
        common: {
          name: 'Example Add-on',
          logoUrl: 'https://example.com/logo.png',
        },
      },
    };

    const [response] = await client.createDeployment({
      parent,
      deploymentId,
      deployment,
    });

    console.log(`Created deployment: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Deployment already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid deployment argument: ${err.message}`);
    } else {
      console.error(`Failed to create deployment: ${err.message}`);
    }
  }
}

module.exports = {createDeployment};
// [END gsuiteaddons_v1_gsuiteaddons_deployment_create]
