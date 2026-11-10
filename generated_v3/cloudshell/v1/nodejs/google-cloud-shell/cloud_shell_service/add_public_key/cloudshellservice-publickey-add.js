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

// [START cloudshell_v1_cloudshellservice_add_public_key]
'use strict';

const {CloudShellServiceClient} = require('@google-cloud/shell');
const {status} = require('@grpc/grpc-js');

const client = new CloudShellServiceClient();

/**
 * Use the addPublicKey method
 *
 * @param {string} userId - The user identifier or email address to whom the environment belongs, or 'me' for the currently authenticated user.
 * @param {string} environmentId - The Cloud Shell environment identifier, typically 'default'.
 * @param {string} key - The public SSH key to add to the environment, formatted as '<format> <content>' (e.g., 'ssh-rsa AAAAB3...').
 */
async function addPublicKey(userId, environmentId, key) {
  try {
    const environment = `users/${userId}/environments/${environmentId}`;

    const request = {
      environment,
      key,
    };

    // Initiates the long-running operation to add the public key
    const [operation] = await client.addPublicKey(request);
    const [response] = await operation.promise();

    console.log(`Public key successfully added: ${response.key}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Public key already exists in environment: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Cloud Shell environment not found: ${err.message}`);
    } else {
      console.error(`Failed to add public key: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { addPublicKey };
// [END cloudshell_v1_cloudshellservice_add_public_key]
