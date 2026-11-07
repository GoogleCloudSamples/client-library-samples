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

// [START gsuiteaddons_v1_gsuiteaddons_uninstall_deployment]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Use the uninstallDeployment method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} deploymentId - The identifier of the deployment to uninstall.
 */
async function uninstallDeployment(projectId, deploymentId) {
  const name = `projects/${projectId}/deployments/${deploymentId}`;

  try {
    const request = {
      name,
    };

    await client.uninstallDeployment(request);
    console.log(`Uninstalled deployment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Deployment not found: ${name}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { uninstallDeployment };
// [END gsuiteaddons_v1_gsuiteaddons_uninstall_deployment]
