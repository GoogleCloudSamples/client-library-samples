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

// [START gsuiteaddons_v1_gsuiteaddons_replace_deployment]
'use strict';

const {GSuiteAddOnsClient} = require('@google-cloud/gsuiteaddons');
const {status} = require('@grpc/grpc-js');

const client = new GSuiteAddOnsClient();

/**
 * Replaces an existing Google Workspace add-on deployment.
 *
 * @param {string} projectId - The Google Cloud project ID where the add-on deployment is hosted.
 * @param {string} deploymentId - The caller-specified identifier of the deployment.
 */
async function replaceDeployment(projectId, deploymentId) {
  try {
    const name = `projects/${projectId}/deployments/${deploymentId}`;

    // Retrieve the existing deployment to preserve configuration and the etag for concurrency control.
    const [existingDeployment] = await client.getDeployment({name});

    const calendar = {
      currentEventAccess: 'READ_WRITE',
    };

    const addOns = {
      ...existingDeployment.addOns,
      calendar,
    };

    const oauthScopes = Array.from(
      new Set([
        ...(existingDeployment.oauthScopes || []),
        'https://www.googleapis.com/auth/calendar.addons.execute',
      ])
    );

    const deployment = {
      name,
      oauthScopes,
      addOns,
      etag: existingDeployment.etag,
    };

    const [response] = await client.replaceDeployment({deployment});
    console.log(`Replaced deployment: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Deployment not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during replacement: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid deployment configuration: ${err.message}`);
    } else {
      console.error(`Failed to replace deployment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { replaceDeployment };
// [END gsuiteaddons_v1_gsuiteaddons_replace_deployment]
