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

// [START gsuiteaddons_v1_gsuiteaddons_installstatus_get]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Use the getInstallStatus method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} deploymentId - The caller-chosen ID of the Google Workspace add-on deployment.
 */
async function getInstallStatus(projectId, deploymentId) {
  try {
    const name = `projects/${projectId}/deployments/${deploymentId}/installStatus`;
    const request = {
      name,
    };

    const [response] = await client.getInstallStatus(request);
    console.log(`Install status resource: ${response.name}`);
    console.log(`Installed: ${response.installed?.value ?? response.installed}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Install status not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while retrieving install status: ${err.message}`);
    } else {
      console.error(`Failed to retrieve install status: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstallStatus };
// [END gsuiteaddons_v1_gsuiteaddons_installstatus_get]
