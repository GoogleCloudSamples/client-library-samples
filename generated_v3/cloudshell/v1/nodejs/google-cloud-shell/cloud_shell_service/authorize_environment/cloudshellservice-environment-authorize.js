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

// [START cloudshell_v1_cloudshellservice_authorize_environment]
'use strict';

const {CloudShellServiceClient} = require('@google-cloud/shell');
const {status} = require('@grpc/grpc-js');

const client = new CloudShellServiceClient();

/**
 * Authorizes a Cloud Shell environment with credentials.
 */
async function authorizeEnvironment() {
  try {
    // Cloud Shell requires the target user to be 'me' and environment to be 'default'.
    const user = 'me';
    const environment = 'default';
    const name = client.environmentPath(user, environment);

    const authClient = await client.auth.getClient();
    const tokenResponse = await authClient.getAccessToken();
    const accessToken =
      typeof tokenResponse === 'string'
        ? tokenResponse
        : tokenResponse?.token || '';

    const request = {
      name,
      accessToken,
    };

    const [operation] = await client.authorizeEnvironment(request);
    const [response] = await operation.promise();

    console.log('Environment authorization completed.');
    console.log(`Operation response: ${JSON.stringify(response)}`);
  } catch (err) {
    if (
      err.code === status.INTERNAL ||
      err.code === status.FAILED_PRECONDITION
    ) {
      console.log('Environment is not in a running state:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Environment not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Failed to authorize environment:', err.message);
    }
  }
}

module.exports = { authorizeEnvironment };
// [END cloudshell_v1_cloudshellservice_authorize_environment]
