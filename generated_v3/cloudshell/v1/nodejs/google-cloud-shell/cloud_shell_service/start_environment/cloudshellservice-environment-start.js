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

// [START cloudshell_v1_cloudshellservice_start_environment]
'use strict';

const {CloudShellServiceClient} = require('@google-cloud/shell');
const {status} = require('@grpc/grpc-js');

const client = new CloudShellServiceClient();

/**
 * Use the startEnvironment method
 *
 * @param {string} userId - The user identifier or owner email address for the Cloud Shell environment, or 'me' for the currently authenticated user.
 * @param {string} environmentId - The identifier of the Cloud Shell environment. Each user has at least one environment with ID 'default'.
 */
async function startEnvironment(userId, environmentId) {
  try {
    const name = client.environmentPath(userId, environmentId);

    const request = {
      name,
    };

    const [operation] = await client.startEnvironment(request);
    const [response] = await operation.promise();

    console.log(`Environment started: ${response.environment?.name}`);
    console.log(`Environment state: ${response.environment?.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Environment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error: ${err.message}`);
    }
  }
}

module.exports = { startEnvironment };
// [END cloudshell_v1_cloudshellservice_start_environment]
