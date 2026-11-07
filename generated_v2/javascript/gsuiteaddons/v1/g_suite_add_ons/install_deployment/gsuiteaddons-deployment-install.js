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

// [START gsuiteaddons_v1_gsuiteaddons_install_deployment]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Installs a Google Workspace add-on deployment.
 */
async function installDeployment() {
  const projectId = await client.getProjectId();
  const parent = `projects/${projectId}`;
  let deploymentName = `${parent}/deployments/example-deployment-id`;

  // Find an existing deployment or create a placeholder deployment if none exists.
  try {
    const [deployments] = await client.listDeployments({parent});
    if (deployments && deployments.length > 0) {
      deploymentName = deployments[0].name;
    } else {
      const common = {
        name: 'Example Add-on',
        logoUrl: 'https://ssl.gstatic.com/docs/script/images/logo.png',
      };
      const deployment = {
        addOns: {
          common,
        },
      };
      const [created] = await client.createDeployment({
        parent,
        deploymentId: 'example-deployment',
        deployment,
      });
      deploymentName = created.name;
    }
  } catch (err) {
    if (err.code !== status.NOT_FOUND && err.code !== status.ALREADY_EXISTS) {
      throw err;
    }
  }

  const name = deploymentName;

  try {
    const request = {
      name,
    };

    await client.installDeployment(request);
    console.log(`Installed deployment: ${name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Deployment is already installed: ${name}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Deployment not found: ${name}`);
    } else {
      throw err;
    }
  }
}

module.exports = { installDeployment };
// [END gsuiteaddons_v1_gsuiteaddons_install_deployment]
