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

// [START cloudshell_v1_cloudshellservice_environment_get]
'use strict';

const {CloudShellServiceClient} = require('@google-cloud/shell');
const {status} = require('@grpc/grpc-js');

const client = new CloudShellServiceClient();

/**
 * Use the getEnvironment method
 *
 * @param {string} userId - The user identifier or email address (or 'me' for the authenticated user) who owns the environment.
 * @param {string} environmentId - The identifier of the Cloud Shell environment, typically 'default'.
 */
async function getEnvironment(userId, environmentId) {
  try {
    const name = `users/${userId}/environments/${environmentId}`;
    const request = {
      name,
    };

    const [environment] = await client.getEnvironment(request);

    console.log(`Environment Name: ${environment.name}`);
    console.log(`State: ${environment.state}`);
    console.log(`Docker Image: ${environment.dockerImage}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Environment resource not found for user: ${userId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing environment for user: ${userId}`);
    } else {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { getEnvironment };
// [END cloudshell_v1_cloudshellservice_environment_get]
